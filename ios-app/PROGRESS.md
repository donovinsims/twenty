# Client Ops — Mobile App (iOS) · Status Doc

Living doc for the iOS app that reads/writes Twenty CRM records on the go.
Path: `/Users/forex/twenty/ios-app`.

_Last updated: 2026-09-08 (Phase 0 in progress)_

---

## 1. Goal & Decisions

- **Goal**: a native-feel iOS app (Ionic + React + Capacitor) that lets the user
  **read and update records** (client projects, companies, tasks, findings) from
  their self-hosted Twenty instance on the go.
- **Distribution**: TestFlight, internal (just the user).
- **Hosting**: Twenty will move to a VPS the user purchases (NOT yet bought —
  only needed for real on-device testing, Phase 1+).
- **App approach**: native-feel Ionic shell (native UI components, not a
  webview-of-the-web-app).
- **`~/solo-crm` is a different product — ignore it.**
- **Bundle ID**: `com.clientoperationsos.ios` · package name:
  `client-operations-os-mobile`.
- **Server today**: `SERVER_URL=http://localhost:3000` (local docker-compose,
  postgres:16 + redis) — phone can't reach it until the VPS exists.

## 2. Environment (macOS quirks — read before building)

- Node **v26.7.0**, npm 11.19.0, yarn 1.22.22 (classic). No global Ionic CLI.
- Xcode **27.0 beta** (Build 27A5252f) at `/Applications/Xcode-beta.app`,
  iOS 27.0 simulator runtimes installed (iPhone 17 / 17 Pro, …).
- **`xcode-select` points at `/Library/Developer/CommandLineTools`** — plain
  `xcodebuild` / `xcrun` FAIL on PATH. Use explicit paths:
  - `/Applications/Xcode-beta.app/Contents/Developer/usr/bin/xcodebuild`
  - `/Applications/Xcode-beta.app/Contents/Developer/usr/bin/simctl`
  - Note: `xcrun` is missing from that usr/bin; `simctl` works directly.
  - Fix permanently (needs sudo, ask user): `sudo xcode-select -s /Applications/Xcode-beta.app`

## 3. Architecture (data layer)

- `twenty-client-sdk@2.37.0` from **npm is a STUB** — `new CoreApiClient()`
  throws "CoreApiClient was not generated. Install this app on a Twenty instance
  or run `yarn twenty dev`." Real generation needs a live remote → **blocked
  until VPS exists**.
- **Override**: custom thin GraphQL client — `fetch` to
  `{baseUrl}/graphql`, header `Authorization: Bearer <API token>` (verify
  header once server is reachable).
- Query/mutation shapes come from the **real generated SDK** in
  `crm-app/node_modules/twenty-client-sdk/dist/core.mjs` (923KB, full schema
  embedded). Decode script: `/var/folders/j1/bm9p1j8s5gjd3wp0gvmwdqwr0000gq/T/opencode/decode-schema.cjs`
  (temp dir — may be wiped; regenerate from core.mjs).
- Google OAuth (ASWebAuthenticationSession) is the fallback auth path (instance
  has Google SSO); Google blocks embedded webviews.

### Confirmed GraphQL contract (from schema probe)
- Lists: `query ($filter: XFilterInput, $orderBy: [XOrderByInput], $first: Int)` →
  connections with `edges { node { … } }`, `totalCount`, `pageInfo`.
- Filter type names: `ClientProjectFilterInput`, `CompanyFilterInput`,
  `TaskFilterInput`, `OperationalFindingFilterInput`, `ProjectDecisionFilterInput`,
  `PersonFilterInput`, `WorkspaceMemberFilterInput`.
- OrderBy is an **array** of e.g. `{ createdAt: DescNullsLast }`
  (OrderByDirection values: AscNullsFirst / AscNullsLast / DescNullsFirst / DescNullsLast).
- Singular lookup: `clientProjects(filter: { id: { eq: $id } }, first: 1)`.
- **Mutations take `id` directly** (UUID!) + `data`:
  - `updateClientProject(id: UUID!, data: ClientProjectUpdateInput!)`
  - `updateCompany(id, data: CompanyUpdateInput!)`
  - `updateTask(id, data: TaskUpdateInput!)`
  - `updateOperationalFinding(id, data: OperationalFindingUpdateInput!)`
  - `createTask(id-less: data + upsert)` etc. exist for later.
- Enums (values):
  - ClientProjectStatus: PLANNED ACTIVE WAITING_ON_ME WAITING_ON_CLIENT BLOCKED
    REVIEW DELIVERED COMPLETED CANCELLED
  - TaskStatus: TODO IN_PROGRESS DONE · TaskCategory: CLIENT_FOLLOW_UP PAYMENT
    REVIEW INTERNAL SCHEDULING OTHER
  - Company: relationshipStatus (client/lead enum), clientHealth, businessType.
  - Finding: status (OBSERVED / INVESTIGATING / DISCUSSED / …), area,
    automationOpportunity (bool), discussedWithClient (bool), resolvedAt.
- Key fields — **ClientProject**: name, projectValue (`Currency` = amountMicros
  + currencyCode), amountPaid, priority, status, currentPhase, nextPhase,
  nextAction, blockedReason, waitingOn, paymentStatus, paymentMethod,
  targetCompletionDate, nextPaymentDue, summary, company {id name}, tasks,
  operationalFindings.
- **Task**: title, bodyV2 (rich text), dueAt, status, category, assigneeId,
  clientProjectId, clientProject.
- **Company**: name, domainName, address, relationshipStatus, businessType,
  nextAction, currentSystems, clientHealth, annualRevenue, people.
- **Finding**: name, area, description, evidence, estimatedImpact,
  possibleSolution, automationOpportunity, potentialAutomation,
  discussedWithClient, status, resolvedAt, clientProjectId, companyId.

## 4. App structure (target)

```
src/
  lib/        twenty.ts (GraphQL client) · api.ts (data fns) · types.ts ·
              format.ts (money/dates/rich-text) · storage.ts (Keychain/Face ID)
  state/      AuthContext.tsx (connect gate, Face ID unlock)
  pages/      Connect · Today · Projects(+detail) · Companies(+detail) ·
              Tasks · Findings(+detail) · Settings
  components/ StatusPill · EmptyState · EditFieldModal …
```
- Tabs: **Today** (6 stat cards mirroring desktop dashboard: waiting on me,
  money owed, blocked, active, follow-up, open findings) · **Projects** ·
  **Companies** · **Tasks** (quick-complete) · **Findings**.
- Details push outside the tab bar (native feel); dark mode = system
  (`palettes/dark.system.css`); haptics via `@ionic/react` Haptics;
  pull-to-refresh everywhere.

## 5. Status

### Done
- [x] Scaffolded `ios-app` (Ionic 9 / React 19 / react-router 6, tabs template).
- [x] npm deps: `@capacitor/{core,ios,cli}@8.5.1`, camera, share, keyboard,
  status-bar, splash-screen, haptics, network, preferences (all v8),
  `twenty-client-sdk@2.37.0`.
- [x] Decoded full schema from crm-app generated SDK + probed all query
  args / mutation signatures / update-input fields (see §3).
- [x] Confirmed Xcode-beta 27 + iOS 27 simulator work via explicit paths.

### Blocked / Open
- [ ] **Biometrics plugin NOT installed** — `@capawesome-team/capacitor-biometrics`
  **and** `@capawesome/capacitor-biometrics` both 404 on npm (2026-09-08).
  Re-check registry (renamed? deprecated?) or switch to
  `@aparajita/capacitor-biometric-auth` / Capacitor Community alternatives.
- [ ] VPS not purchased (user to provide) — blocks on-device testing + token
  auth verification.
- [ ] `capacitor.config.ts` not created yet (the `--capacitor` CLI flag in the
  scaffold did not take effect).
- [ ] Token auth header (`Authorization: Bearer`) unverified against live server.
- [ ] npm audit: 8 vulnerabilities (6 moderate, 2 high) — mostly template/deps.

### Next (in order)
1. `capacitor.config.ts` (appId `com.clientoperationsos.ios`, appName "Client
   Ops", `webDir: 'dist'`) + `base: './'` in vite.config.ts.
2. Biometrics plugin install (alternative above) — or defer Face ID to a
   follow-up and use app-sandbox storage for Phase 0.
3. `src/lib/*` — GraphQL client, api fns, types, formatters, storage.
4. `src/state/AuthContext.tsx` + `pages/ConnectPage.tsx` (URL + API token,
   validate with a health query, save, Face-ID gate on relaunch).
5. Pages: Today / Projects / Companies / Tasks / Findings + detail/edit.
6. Router in `App.tsx` (tabs + detail stack + /connect + /settings).
7. `npm run build` (tsc + vite) until green.
8. `npx cap add ios` → `npm run build && npx cap sync ios` → build with the
   Xcode-beta `xcodebuild` → `simctl boot "iPhone 17 Pro"` → install + launch.

## 6. Command reference

```sh
# web build (must pass before iOS build)
npm run build                       # = tsc && vite build (output: dist/)

# iOS platform (after capacitor.config.ts exists)
npx cap add ios
npm run build && npx cap sync ios

# native build (Xcode beta — path workaround)
/Applications/Xcode-beta.app/Contents/Developer/usr/bin/xcodebuild \
  -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -sdk iphonesimulator -destination 'platform=iOS Simulator,name=iPhone 17 Pro' \
  CODE_SIGNING_ALLOWED=NO build

# simulator
/Applications/Xcode-beta.app/Contents/Developer/usr/bin/simctl list devices
# install+launch the built .app on the booted sim
```

## 7. Repo layout

- `ios-app/` — THIS app (React TS, Ionic, Capacitor).
- `crm-app/` — the Twenty extension (custom objects/agents/dashboard). Source of
  domain semantics + the real generated SDK schema.
- `twenty/…` (sibling dirs) — upstream Twenty platform code.