import { defineLogicFunction } from 'twenty-sdk/define';
import { createTimelineActivity } from 'twenty-sdk/logic-function';
import type {
  DatabaseEventPayload,
  ObjectRecordUpdateEvent,
} from 'twenty-sdk/logic-function';
import { CoreApiClient } from 'twenty-client-sdk/core';

import {
  PROJECT_STATUS_CHANGED_TIMELINE_ACTIVITY_UNIVERSAL_IDENTIFIER,
  WATCH_CLIENT_PROJECT_CHANGES_LOGIC_FUNCTION_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

function getClient() {
  return new CoreApiClient();
}

type ClientProject = {
  id: string;
  name?: string | null;
  status?: string | null;
  waitingOn?: string | null;
  blockedReason?: string | null;
};

type ClientProjectUpdateEvent = DatabaseEventPayload<
  ObjectRecordUpdateEvent<ClientProject>
>;

/**
 * Watches client project status changes.
 *
 * When a project transitions to BLOCKED or WAITING_ON_ME, an explicit status
 * timeline activity is written on the record so the change surfaces on the
 * project's timeline. When a project becomes BLOCKED, a follow-up task is also
 * created on the client project (category "unblock") so it lands in the Tasks
 * view and on the Today dashboard.
 */
const handler = async (event: ClientProjectUpdateEvent) => {
  const { after, before } = event.properties;

  const previousStatus = before?.status ?? null;
  const nextStatus = after?.status ?? null;

  // Only react to actual transitions.
  if (!nextStatus || nextStatus === previousStatus) {
    return { handled: false, reason: 'no-status-change' };
  }

  await createTimelineActivity({
    timelineActivityTypeUniversalIdentifier:
      PROJECT_STATUS_CHANGED_TIMELINE_ACTIVITY_UNIVERSAL_IDENTIFIER,
    targetObjectUniversalIdentifier: 'clientProject',
    targetRecordId: event.recordId,
    properties: { from: previousStatus, to: nextStatus },
  });

  // Blocked projects get a follow-up task so they can't be forgotten.
  if (nextStatus === 'BLOCKED') {
    const client = getClient();

    const blockedReason = after?.blockedReason ?? null;
    const taskTitle = `Unblock: ${after?.name ?? 'client project'}${blockedReason ? ` — ${blockedReason}` : ''}`;

    await client.mutation({
      createTask: {
        __args: {
          data: {
            title: taskTitle,
            status: 'TODO',
            category: 'INTERNAL',
            clientProjectId: event.recordId,
          },
        },
        id: true,
        title: true,
      },
    });
  }

  return { handled: true, from: previousStatus, to: nextStatus };
};

export default defineLogicFunction({
  universalIdentifier: WATCH_CLIENT_PROJECT_CHANGES_LOGIC_FUNCTION_UNIVERSAL_IDENTIFIER,
  name: 'watch-client-project-changes',
  description:
    'On client project status change: records a timeline activity, and creates an unblock follow-up task when a project becomes blocked.',
  timeoutSeconds: 20,
  handler,
  databaseEventTriggerSettings: {
    eventName: 'clientProject.updated',
    updatedFields: ['status'],
  },
});