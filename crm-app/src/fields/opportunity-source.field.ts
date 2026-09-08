import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'source',
  }),
  objectUniversalIdentifier: OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.SELECT,
  name: 'source',
  label: 'Source',
  isNullable: true,
  options: [
    { position: 0, label: 'Referral', value: 'REFERRAL', color: 'green' },
    { position: 1, label: 'Inbound', value: 'INBOUND', color: 'blue' },
    { position: 2, label: 'Outreach', value: 'OUTREACH', color: 'orange' },
    { position: 3, label: 'Audit', value: 'AUDIT', color: 'purple' },
    { position: 4, label: 'Recurring', value: 'RECURRING', color: 'sky' },
    { position: 5, label: 'Other', value: 'OTHER', color: 'gray' },
  ],
});