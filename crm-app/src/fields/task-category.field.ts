import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  TASK_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'category',
  }),
  objectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.SELECT,
  name: 'category',
  label: 'Category',
  isNullable: true,
  options: [
    { position: 0, label: 'Client Follow-Up', value: 'CLIENT_FOLLOW_UP', color: 'orange' },
    { position: 1, label: 'Payment', value: 'PAYMENT', color: 'green' },
    { position: 2, label: 'Review', value: 'REVIEW', color: 'purple' },
    { position: 3, label: 'Internal', value: 'INTERNAL', color: 'gray' },
    { position: 4, label: 'Scheduling', value: 'SCHEDULING', color: 'blue' },
    { position: 5, label: 'Other', value: 'OTHER', color: 'gray' },
  ],
});