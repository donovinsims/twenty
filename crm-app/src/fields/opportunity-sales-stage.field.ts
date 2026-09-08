import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'salesStage',
  }),
  objectUniversalIdentifier: OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.SELECT,
  name: 'salesStage',
  label: 'Sales Stage',
  isNullable: true,
  options: [
    { position: 0, label: 'Discovered', value: 'DISCOVERED', color: 'sky' },
    { position: 1, label: 'Discussing', value: 'DISCUSSING', color: 'blue' },
    { position: 2, label: 'Proposal & Scope', value: 'PROPOSAL_SCOPE', color: 'purple' },
    { position: 3, label: 'Approved', value: 'APPROVED', color: 'green' },
    { position: 4, label: 'Won', value: 'WON', color: 'jade' },
    { position: 5, label: 'Lost', value: 'LOST', color: 'red' },
  ],
});