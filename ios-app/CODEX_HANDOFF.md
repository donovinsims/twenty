# CODEX HANDOFF — Client Ops iOS App

**You are Codex. Resume this project where the previous agent stopped.**
Target: a native-feel iOS app (Ionic + React + Capacitor) that reads and updates
records from a self-hosted Twenty CRM. Workdir for the app: `/Users/forex/twenty/ios-app`.
Light status doc (keep in sync): `ios-app/PROGRESS.md`. This file is the action doc.

_Last updated: 2026-09-08 · Phase 0 (shell) ~40% done, nothing in flight._

---

## 1. Mission & non-negotiables

- **Must-have**: read + update records on the go (client projects, companies,
  tasks, operational findings) with the **best native iOS feel** practically
  achievable from Ionic (native components, push details over tab bar, pull-to-refresh,
  haptics, system dark mode, safe areas).
- **Distribution**: TestFlight, internal (one user). Keep signing/personal-team simple.
- **Hosting**: self-hosted Twenty → **VPS not yet purchased** (user will provide one).
  Until then, everything must run against `SERVER_URL=http://localhost:3000`
  (this repo's local setup; note: `crm-app/SETUP.md` says dev UI is
  `http://localhost:2020` — the app lets the user type the server URL, so just
  keep the default placeholder sensible).
- **Ignore `~/solo-crm`** entirely — different product.
- **Bundle ID**: `com.clientoperationsos.ios` · npm name `client-operations-os-mobile`.
- Do NOT use the npm `twenty-client-sdk` as a client — it's a stub (see §2).
- Ask the user before purchases (VPS, Apple Developer) or irreversible actions;
  the VPS purchase and Apple cert flow belong to the user.

## 2. Environment truths (do not re-derive)

- **`twenty-client-sdk@2.37.0` from npm is a STUB**: `new CoreApiClient()` throws
  "CoreApiClient was not generated…". It exists in `ios-app/node_modules` but is
  useless. Real generated SDK with full schema: `crm-app/node_modules/twenty-client-sdk/dist/core.mjs`
  (923KB). Decoder: `/var/folders/j1/bm9p1j8s5gjd3wp0gvmwdqwr0000gq/T/opencode/decode-schema.cjs`
  (temp dir — if wiped, re-extract from core.mjs: it embeds `{"types":{…}}` JSON).
- **Data layer**: custom thin GraphQL client — `POST {baseUrl}/graphql` with
  `Authorization: Bearer <token>`. Header is ASSUMED, **unverified** until a live
  server exists; keep the client small so swapping to another header is one line.
- **Xcode**: only a **beta** is installed. `/Applications/Xcode-beta.app`,
  Build 27A5252f, iOS 27.0 simulators (iPhone 17 / 17 Pro …). **`xcode-select`
  points at CommandLineTools**, so plain `xcodebuild`/`xcrun` fail. Use:
  - `/Applications/Xcode-beta.app/Contents/Developer/usr/bin/xcodebuild`
  - `/Applications/Xcode-beta.app/Contents/Developer/usr/bin/simctl`
  - `xcrun` is absent from that usr/bin; `simctl` works standalone.
  - Permanent fix (needs sudo — ask user): `sudo xcode-select -s /Applications/Xcode-beta.app`
- **Node v26.7.0, npm 11.19.0** (yarn 1.22 classic — don't add yarn 4 stuff).
  No global Ionic CLI; use `npx @ionic/cli`.
- **Google SSO is enabled** in the Twenty instance (`.env` has
  `AUTH_GOOGLE_CALLBACK_URL` etc.). Google blocks OAuth in embedded webviews —
  if auth moves off API tokens later, use ASWebAuthenticationSession.
- **Installed deps** (ios-app): `@capacitor/{core,ios,cli}@8.5.1`, `camera`,
  `share`, `keyboard`, `status-bar`, `splash-screen`, `haptics`, `network`,
  `preferences` (all v8), Ionic 9, React 19, react-router 6, `twenty-client-sdk@2.37.0` (stub).
- **Biometrics plugin 404s on npm** (checked 2026-09-08): both
  `@capawesome-team/capacitor-biometrics` and `@capawesome/capacitor-biometrics`
  return 404. Defer Face ID (Phase 3); do NOT burn time retrying the same names.
- Vite template lacks `base: './'` && `capacitor.config.ts` is missing —
  both must be added for the Capacitor bundle to load under `capacitor://`.

## 3. Verified GraphQL contract (from real SDK — use as-is)

- **Lists** — connection shape: `edges { node { … } }`, `totalCount`, `pageInfo`.
  ```graphql
  query List($filter: ClientProjectFilterInput, $orderBy: [ClientProjectOrderByInput], $first: Int) {
    clientProjects(filter: $filter, orderBy: $orderBy, first: $first) {
      edges { node { id name status … } }
    }
  }
  ```
- **OrderBy is an ARRAY**: e.g. `[{ createdAt: DescNullsLast }]` or `[{ dueAt: AscNullsLast }]`.
  (Values: AscNullsFirst/AscNullsLast/DescNullsFirst/DescNullsLast.)
- **Filter type names**: `ClientProjectFilterInput`, `CompanyFilterInput`,
  `TaskFilterInput`, `OperationalFindingFilterInput`, `ProjectDecisionFilterInput`,
  `PersonFilterInput`, `WorkspaceMemberFilterInput`.
- **Filter shapes**: `{ status: { in: [ACTIVE] } }`, `{ nextAction: { is: "NOT_NULL" } }`,
  `{ id: { eq: "uuid" } }`, `{ companyId: { eq: "uuid" } }`.
- **Mutations take `id` + `data` (NOT a where-object)**:
  `updateClientProject(id: UUID!, data: ClientProjectUpdateInput!)`,
  `updateCompany(id, data: CompanyUpdateInput!)`,
  `updateTask(id, data: TaskUpdateInput!)`,
  `updateOperationalFinding(id, data: OperationalFindingUpdateInput!)`.
  Create variants exist (`createTask(data, upsert)`) for later phases.
- **Enums**:
  - `ClientProjectStatus`: PLANNED ACTIVE WAITING_ON_ME WAITING_ON_CLIENT BLOCKED
    REVIEW DELIVERED COMPLETED CANCELLED
  - `TaskStatus`: TODO IN_PROGRESS DONE · `TaskCategory`: CLIENT_FOLLOW_UP PAYMENT
    REVIEW INTERNAL SCHEDULING OTHER
  - Company: `relationshipStatus` (client-type enum), `clientHealth` (HEALTHY/…),
    `businessType` (provider-type enum).
  - Finding: `status` (OBSERVED/INVESTIGATING/DISCUSSED/…), `area`, bools
    `automationOpportunity`, `discussedWithClient`, date `resolvedAt`.
- **Key fields**:
  - ClientProject: name, projectValue, amountPaid (Currency = `{amountMicros, currencyCode}`),
    priority, status, currentPhase, nextPhase, nextAction, blockedReason, waitingOn,
    paymentStatus, paymentMethod, targetCompletionDate, nextPaymentDue, summary,
    company {id name}, tasks, operationalFindings.
  - Task: title, bodyV2 (rich text — treat as unknown JSON, render defensively),
    dueAt, status, category, assigneeId, clientProjectId.
  - Company: name, domainName, address, relationshipStatus, businessType, nextAction,
    currentSystems, clientHealth, annualRevenue.
  - Finding: name, area, description, evidence, estimatedImpact, possibleSolution,
    automationOpportunity, potentialAutomation, discussedWithClient, status, resolvedAt,
    clientProjectId, companyId.

## 4. Current state (as of handoff)

### Done
- [x] Scaffolded `ios-app` (Ionic 9 tabs template; package renamed; deps installed — see §2).
- [x] Full schema decoded + query/mutation arg types probed (see §3).
- [x] `PROGRESS.md` created (status doc).
- [x] iOS 27.0 simulator + Xcode-beta build path verified working.

### Blocked / intentional skips
- [ ] VPS not purchased (user) — blocks Phase 1, not Phase 0.
- [ ] Biometrics plugin 404 — deferred to Phase 3 (use `@capacitor/preferences` for
      token storage until then).
- [ ] Token auth header unverified (needs live server).
- [ ] Xcode beta friction — handled via explicit binary paths.

### Phase 0 — remaining work (do this FIRST; each step has a verification gate)
1. **`capacitor.config.ts`** in ios-app:
   `{ appId: 'com.clientoperationsos.ios', appName: 'Client Ops', webDir: 'dist' }`
   (Typed `CapacitorConfig` from `@capacitor/cli`.)
2. **`vite.config.ts`**: add `base: './'` (critical for `capacitor://` asset loading).
3. **`src/lib/`**:
   - `twenty.ts` — `class Twenty { constructor(baseUrl, getToken) }` with
     `async gql<T>(query, variables)` → fetch `${baseUrl}/graphql`,
     `Authorization: Bearer`, parse `data`, throw on `errors[0].message`.
   - `api.ts` — data functions using §3 shapes: lists (projects w/ optional status
     filter + company id/name, companies w/ nextAction filter, tasks w/ status filter,
     findings), single-record fetch `X(filter: {id: {eq}})`; updates; today's 6 stat
     counts via one query with `totalCount` per filtered field.
   - `types.ts` — TS interfaces mirroring key fields (subset of §3).
   - `format.ts` — money (amountMicros/1e6 + currencyCode), dates (relative + medium),
     names (FullName {firstName,lastName}), initials, safe rich-text → text.
   - `storage.ts` — `@capacitor/preferences` wrapper: load/save/clear
     `{ baseUrl, token }` (swap backend to Keychain in Phase 3).
4. **`src/state/AuthContext.tsx`** — provider: reads storage on boot (spinner while
   loading); exposes `{account, setAccount, logout}`.
5. **`src/pages/ConnectPage.tsx`** — server URL + API token inputs; on Connect: run a
   health query (e.g. `workspaceMembers { edges { node { id } } }`), on success save +
   show logged-in state. First-run gate: unauthenticated → `/connect`.
6. **Pages** (tabs + detail):
   - `TodayPage` — 6 stat cards mirroring desktop dashboard (waiting on me, money owed,
     blocked, active, follow-up, open findings); tap navigates to the related tab.
   - `ProjectsPage` + `ProjectDetailPage` — list w/ status pill + company + value;
     detail: status/priority pickers (IonActionSheet or segment), inline text edit of
     nextAction/currentPhase/nextPhase/blockedReason/waitingOn via a reusable modal.
   - `CompaniesPage` + `CompanyDetailPage` — relationshipStatus picker, nextAction
     edit, clientHealth picker; show linked people (filter companyId).
   - `TasksPage` — open/done segments; checkbox toggles status; edit title/category.
   - `FindingsPage` + `FindingDetailPage` — status picker, area, evidence/solution text.
   - `SettingsPage` — server URL/token view + logout (+ placeholder for Face ID toggle).
   - Reusable: `StatusPill`, `EmptyState`, `EditFieldModal`, pull-to-refresh everywhere,
     `Haptics` from `@ionic/react` on key interactions.
7. **`src/App.tsx`** — route layout:
   - `/connect` (no tabs) · `/settings` + detail routes `/projects/:id`,
     `/companies/:id`, `/findings/:id` (no tab bar — push feel)
   - tabs: `/today /projects /companies /tasks /findings`.
   - Delete template `Tab1/2/3` + `ExploreContainer`; replace `App.test.tsx` with a
     pure-formatter smoke test; update `index.html` title/meta.
8. **Gate: `npm run build`** (tsc strict + vite) must pass.
9. **iOS**: `npx cap add ios` → `npm run build && npx cap sync ios` → build:
   ```bash
   /Applications/Xcode-beta.app/Contents/Developer/usr/bin/xcodebuild \
     -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
     -sdk iphonesimulator -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
     CODE_SIGNING_ALLOWED=NO build
   ```
   → boot sim + install + launch via `simctl`; **screenshot as proof of life**.
   (Certificate flow comes in Phase 2; simulator needs no signing.)
10. Update `PROGRESS.md` after each milestone.

## 5. Phase roadmap (acceptance criteria per phase)

### Phase 1 — Live API (unblocks everything real)
1. User buys VPS (recommend ≥2 vCPU / 4GB / 40GB; Ubuntu 24.04) and gives access.
2. Pre-specified deploy (matches this repo's stack):
   - Domain → DNS A record to VPS (user supplies domain).
   - Install Docker Engine + Caddy (or Nginx+Certbot) for HTTPS.
   - Run official Twenty compose (`twentycrm/twenty` image; server+worker+db).
   - Set `APP_SECRET` (strong random), `SERVER_URL=https://<domain>` (public), keep
     the extension's custom objects — **critical: this instance must run THIS repo's
     app (`crm-app`), not vanilla Twenty**, or clientProjects/findings vanish.
     Deploy path for the extension on VPS: build/install the app into the server
     image (per Twenty docs "deployment" for apps), or run the same `twenty dev`-style
     stack. Decide concretely with the user at that point; document the result here.
   - Update Google OAuth callback URLs in VPS env (`.env` on this repo:
     `AUTH_GOOGLE_CALLBACK_URL`, `AUTH_GOOGLE_APIS_CALLBACK_URL`) to the new domain.
3. **Verify**: create API key in Twenty settings; `curl -H "Authorization: Bearer $KEY"`
   `POST https://<domain>/graphql` with a query from §3 → confirm header works; adjust
   client header one-liner if needed.
4. **Accept**: app on simulator + (if available) user's iPhone reaches real data,
   loads all 5 tabs, updates a record end-to-end.

### Phase 2 — TestFlight
1. User's Apple Developer account (user action): create App ID `com.clientoperationsos.ios`,
   generate signing certs, register device UDID.
2. In app: add `NSFaceIDUsageDescription` now (cheap, avoids future rejection),
   set `ios.minimumVersion` etc. in `capacitor.config.ts` as needed.
3. `xcodebuild -configuration Release -archivePath … archive` + export, or `npx cap open ios`
   + Xcode Organizer → Upload to App Store Connect → TestFlight internal.
4. **Accept**: build appears in TestFlight, user installs on iPhone, connects to VPS.

### Phase 3 — Auth hardening
1. Face ID gate + Keychain token. Plugin decision: re-check npm for
   `@capawesome-team/capacitor-biometrics` (it 404'd 2026-09-08 — maybe republished);
   else `@aparajita/capacitor-biometric-auth`; else Capacitor Community
   `biometric-auth`. If all fail, minimal `NSFaceIDUsageDescription` +
   `localAuthentication` via a tiny native plugin shim.
2. Gate app open with `verifyIdentity({reason})` (fallback open on
   biometry-not-enrolled error). Store token via Keychain, baseUrl in Preferences.
3. Optional: token rotation/revocation UI in Settings.
4. **Accept**: relaunch asks Face ID; token never in plaintext prefs.

### Phase 4 — Feature depth
1. Opportunities + project decisions tabs/sections (schema already decoded).
2. Richer editing: create task from mobile, create finding, edit payment fields
   (amounts, paymentStatus/nextPaymentDue) via number/date inputs.
3. Search (local filter OK; server `searchVector` later), deep links.
4. Offline: cache last-viewed lists (Preferences/`@capacitor/storage` → files),
   offline-first statuses on detail pages.
5. **Accept**: user completes a full "on-site check-in" flow mobile-only (read status,
   update nextAction, log task done).

### Phase 5 — Polish + release
1. Performance (list virtualization if >200 rows), accessibility (VoiceOver pass),
   launch screen, icons (real app icon, not default), haptics tuning, light/dark audit.
2. Small-print: TestFlight review notes if ever public; keep internal-only default.
3. **Accept**: user signs off icon-to-last-screen.

## 6. Roadblocks register
| Issue | Status | Decision / fallback |
|---|---|---|
| VPS not purchased | blocked P1 | ask user; deploy spec in §5 P1 |
| npm `twenty-client-sdk` stub | worked around | custom GraphQL client (§2/§3) |
| Biometrics plugins 404 (2026-09-08) | deferred | Phase 3 re-check + fallbacks |
| Token auth header unverified | unverified | verify first thing in P1 |
| Google OAuth vs webview | avoided | API token now; ASWebAuthenticationSession if needed |
| `xcode-select` → CommandLineTools | handled | explicit beta paths (§2); optional sudo fix |
| Xcode 27 beta only | handled | build via beta; no App Store until user's real Xcode |
| npm audit 8 (6 mod, 2 high) | open | revisit before release, mostly template deps |

## 7. Do not forget
- Keep PROGRESS.md updated; this handoff is the canonical plan.
- Never commit secrets; `.env` exists in repo root (redacted). API keys live only in
  the user's Twenty settings + app Keychain/prefs.
- Verify every milestone with a running artifact (screenshot / curl), not just "built".
- If something in §3 disagrees with a live server response, trust the server, fix §3,
  and note the delta here.