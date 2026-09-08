import { defineLogicFunction } from 'twenty-sdk/define';
import { kv } from 'twenty-sdk/logic-function';
import { CoreApiClient } from 'twenty-client-sdk/core';

import { DAILY_BUSINESS_SNAPSHOT_LOGIC_FUNCTION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

/**
 * Daily business snapshot.
 *
 * Runs every morning (06:00 server time) and aggregates the current state of
 * client operations into the app key-value store, so the front component (or
 * any logic function) can read a single snapshot instead of firing a dozen
 * queries. Also flips client projects whose `nextPaymentDue` date has passed
 * from DEPOSIT_DUE / PARTIALLY_PAID to OVERDUE, and records a daily pulse.
 */
const handler = async () => {
  const client = new CoreApiClient();

  const [active, waitingOnMe, waitingOnClient, blocked, completed, overdue,
    companiesNeedFollowUp, openFindings] = await Promise.all([
    client.query({
      clientProjects: {
        __args: {
          filter: {
            status: { in: ['ACTIVE', 'WAITING_ON_ME', 'WAITING_ON_CLIENT', 'BLOCKED', 'REVIEW'] },
          },
        },
        totalCount: true,
        edges: { node: { id: true, name: true, status: true, paymentStatus: true, nextPaymentDue: true } },
      },
    }),
    client.query({
      clientProjects: {
        __args: { filter: { status: { in: ['WAITING_ON_ME'] } } },
        totalCount: true,
      },
    }),
    client.query({
      clientProjects: {
        __args: { filter: { status: { in: ['WAITING_ON_CLIENT'] } } },
        totalCount: true,
      },
    }),
    client.query({
      clientProjects: {
        __args: { filter: { status: { in: ['BLOCKED'] } } },
        totalCount: true,
      },
    }),
    client.query({
      clientProjects: {
        __args: { filter: { status: { in: ['COMPLETED'] } } },
        totalCount: true,
      },
    }),
    client.query({
      clientProjects: {
        __args: {
          filter: {
            paymentStatus: { in: ['DEPOSIT_DUE', 'PARTIALLY_PAID', 'OVERDUE'] },
          },
        },
        totalCount: true,
        edges: {
          node: { id: true, name: true, paymentStatus: true, nextPaymentDue: true },
        },
      },
    }),
    client.query({
      companies: {
        __args: { filter: { nextAction: { is: 'NOT_NULL' } } },
        totalCount: true,
      },
    }),
    client.query({
      operationalFindings: {
        __args: {
          filter: { status: { in: ['OBSERVED', 'INVESTIGATING', 'DISCUSSED'] } },
        },
        totalCount: true,
      },
    }),
  ]);

  // Flip projects whose payment due date has passed to OVERDUE.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nowIso = today.toISOString();

  const overdueEdges = overdue.clientProjects?.edges ?? [];
  const movedToOverdue: string[] = [];

  for (const { node } of overdueEdges) {
    if (!node) continue;

    const due = node.nextPaymentDue ? new Date(node.nextPaymentDue) : null;
    const shouldBeOverdue =
      due !== null && due.getTime() <= today.getTime() &&
      node.paymentStatus !== 'OVERDUE';

    if (shouldBeOverdue) {
      await client.mutation({
        updateClientProject: {
          __args: {
            id: node.id,
            data: { paymentStatus: 'OVERDUE' },
          },
          id: true,
          paymentStatus: true,
        },
      });
      movedToOverdue.push(node.name ?? node.id);
    }
  }

  const snapshot = {
    snapshotDate: nowIso,
    projects: {
      active: active.clientProjects?.totalCount ?? 0,
      waitingOnMe: waitingOnMe.clientProjects?.totalCount ?? 0,
      waitingOnClient: waitingOnClient.clientProjects?.totalCount ?? 0,
      blocked: blocked.clientProjects?.totalCount ?? 0,
      completed: completed.clientProjects?.totalCount ?? 0,
      moneyOwed: overdue.clientProjects?.totalCount ?? 0,
    },
    companies: {
      needFollowUp: companiesNeedFollowUp.companies?.totalCount ?? 0,
    },
    findings: {
      open: openFindings.operationalFindings?.totalCount ?? 0,
    },
    movedToOverdue,
  };

  await kv.set('daily-business-snapshot', snapshot, { scope: 'SERVER' });

  return snapshot;
};

export default defineLogicFunction({
  universalIdentifier: DAILY_BUSINESS_SNAPSHOT_LOGIC_FUNCTION_UNIVERSAL_IDENTIFIER,
  name: 'daily-business-snapshot',
  description:
    'Daily morning snapshot of client operations: aggregates project/company/finding counts into the app key-value store and flips overdue payment statuses.',
  timeoutSeconds: 30,
  handler,
  cronTriggerSettings: {
    pattern: '0 6 * * *',
  },
});