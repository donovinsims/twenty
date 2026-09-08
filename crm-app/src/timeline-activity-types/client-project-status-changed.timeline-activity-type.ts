import { defineTimelineActivityType } from 'twenty-sdk/define';

import { PROJECT_STATUS_CHANGED_TIMELINE_ACTIVITY_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineTimelineActivityType({
  universalIdentifier: PROJECT_STATUS_CHANGED_TIMELINE_ACTIVITY_UNIVERSAL_IDENTIFIER,
  name: 'clientProjectStatusChanged',
  label: 'changed the status of',
  icon: 'IconStatusChange',
});