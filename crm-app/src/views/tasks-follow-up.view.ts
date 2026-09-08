import {
  defineView,
  getFieldUniversalIdentifier,
  getSystemRelationFieldUniversalIdentifier,
  STANDARD_OBJECT,
  ViewFilterOperand,
  ViewSortDirection,
  ViewType,
} from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_TASKS_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

const taskField = (name: string) =>
  getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
    name,
  });
const taskClientProjectField = getSystemRelationFieldUniversalIdentifier({
  applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
  objectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  relationTargetObjectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
});

export default defineView({
  universalIdentifier: VIEW_TASKS_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
  name: 'Client Follow-Up Tasks',
  objectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconListCheck',
  position: 0,
  fields: [
    { universalIdentifier: '7dd3582a-854e-4cfd-a185-90448db8fb95', fieldMetadataUniversalIdentifier: STANDARD_OBJECT.task.fields.title.universalIdentifier, position: 0, size: 220 },
    { universalIdentifier: '4aee0148-42f8-473e-be3e-b77045216fd3', fieldMetadataUniversalIdentifier: taskField('category'), position: 1, size: 140 },
    { universalIdentifier: '5cbd3835-8655-4f96-9ec0-f030f43708e5', fieldMetadataUniversalIdentifier: STANDARD_OBJECT.task.fields.dueAt.universalIdentifier, position: 2, size: 130 },
    { universalIdentifier: '82cdfce3-bfba-4e13-a9e1-40bf269995a0', fieldMetadataUniversalIdentifier: taskClientProjectField, position: 3, size: 160 },
    { universalIdentifier: '92817659-2606-49ad-8470-470e1ad65b80', fieldMetadataUniversalIdentifier: STANDARD_OBJECT.task.fields.status.universalIdentifier, position: 4, size: 120 },
  ],
  filters: [
    {
      universalIdentifier: 'b26136a7-6833-4393-8203-afdb9dc2e35a',
      fieldMetadataUniversalIdentifier: taskField('category'),
      operand: ViewFilterOperand.IS,
      value: ['CLIENT_FOLLOW_UP'],
    },
  ],
  sorts: [
    {
      universalIdentifier: '8473eff6-76f4-4c27-9a6e-baf2b722a539',
      fieldMetadataUniversalIdentifier: STANDARD_OBJECT.task.fields.dueAt.universalIdentifier,
      direction: ViewSortDirection.ASC,
    },
  ],
});