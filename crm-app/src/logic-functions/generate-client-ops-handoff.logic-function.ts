import { defineLogicFunction } from 'twenty-sdk/define';
import { CoreApiClient } from 'twenty-client-sdk/core';

import { GENERATE_CLIENT_OPS_HANDOFF_LOGIC_FUNCTION_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

/**
 * Generate a client operations handoff.
 *
 * Queries live client-project, company, finding, and task data and returns a
 * structured snapshot that the Handoff Writer agent (or any AI chat) turns
 * into a readable daily/weekly handoff. Exposed as an AI tool.
 */
const handler = async () => {
  const client = new CoreApiClient();

  const [projects, companies, findings, tasks] = await Promise.all([
    client.query({
      clientProjects: {
        __args: {
          filter: {
            status: { in: ['ACTIVE', 'WAITING_ON_ME', 'WAITING_ON_CLIENT', 'BLOCKED', 'REVIEW', 'COMPLETED'] },
          },
        },
        totalCount: true,
        edges: {
          node: {
            id: true,
            name: true,
            companyId: true,
            opportunityId: true,
            status: true,
            paymentStatus: true,
            priority: true,
            currentPhase: true,
            startedAt: true,
            targetCompletionDate: true,
            nextPaymentDue: true,
            nextAction: true,
            blockedReason: true,
            waitingOn: true,
          },
        },
      },
    }),
    client.query({
      companies: {
        __args: {
          filter: { nextAction: { is: 'NOT_NULL' } },
        },
        totalCount: true,
        edges: {
          node: {
            id: true,
            name: true,
            relationshipStatus: true,
            nextAction: true,
            clientHealth: true,
          },
        },
      },
    }),
    client.query({
      operationalFindings: {
        __args: {
          filter: { status: { in: ['OBSERVED', 'INVESTIGATING', 'DISCUSSED', 'RESOLVED'] } },
        },
        totalCount: true,
        edges: {
          node: {
            id: true,
            companyId: true,
            clientProjectId: true,
            title: true,
            severity: true,
            status: true,
            discoveredAt: true,
            priority: true,
            actionRequired: true,
            owner: true,
          },
        },
      },
    }),
    client.query({
      tasks: {
        __args: {
          filter: { status: { in: ['TODO', 'IN_PROGRESS'] } },
        },
        totalCount: true,
        edges: {
          node: {
            id: true,
            title: true,
            status: true,
            dueAt: true,
            assigneeId: true,
            clientProjectId: true,
            category: true,
          },
        },
      },
    }),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    summary: {
      activeProjects: projects.clientProjects?.totalCount ?? 0,
      companiesNeedingFollowUp: companies.companies?.totalCount ?? 0,
      openFindings: findings.operationalFindings?.totalCount ?? 0,
      openTasks: tasks.tasks?.totalCount ?? 0,
    },
    projects: (projects.clientProjects?.edges ?? [])
      .map(({ node }) => node)
      .filter(Boolean),
    companies: (companies.companies?.edges ?? [])
      .map(({ node }) => node)
      .filter(Boolean),
    findings: (findings.operationalFindings?.edges ?? [])
      .map(({ node }) => node)
      .filter(Boolean),
    tasks: (tasks.tasks?.edges ?? []).map(({ node }) => node).filter(Boolean),
  };
};

export default defineLogicFunction({
  universalIdentifier: GENERATE_CLIENT_OPS_HANDOFF_LOGIC_FUNCTION_UNIVERSAL_IDENTIFIER,
  name: 'generate-client-ops-handoff',
  description:
    'Gathers the current client operations state (projects, companies needing follow-up, open findings, open tasks) into a structured snapshot for handoffs.',
  timeoutSeconds: 30,
  handler,
  toolTriggerSettings: {},
});