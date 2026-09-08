import { defineSkill } from 'twenty-sdk/define';

import { CLIENT_OPS_HANDOFF_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: CLIENT_OPS_HANDOFF_SKILL_UNIVERSAL_IDENTIFIER,
  name: 'client-ops-handoff',
  label: 'Client Ops Handoff',
  description:
    'Writes a concise, decision-ready client operations handoff from live CRM data.',
  icon: 'IconUsersGroup',
  content: `You are writing a handoff for a small consultancy running its client work inside Twenty.
Use the "generate-client-ops-handoff" tool to pull the live snapshot, then write the handoff following this structure:

# Daily Handoff — {date}

## Needs attention today
- List blocked projects first (why, who is waiting on whom).
- Then projects waiting on you (your action is the critical path).
- Then overdue payments — name the client and the amount due date.

## Project pulse
For each active project, one line: client, phase, status, next milestone, and the single next action.

## Follow-ups
- Companies with a next action set, grouped by action (maybe: send proposal, check in, chase payment).

## Findings
- Open findings, by severity (critical first), with the required action and owner.

## Tasks
- Open tasks that are due or overdue.

## Rules
- Be terse: a manager should read this in 2 minutes.
- Use plain language, no jargon.
- If a field is empty, say "not set" — never invent data.
- If the snapshot is empty, say so plainly instead of padding.`,
});