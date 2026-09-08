import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'relationshipStatus',
  }),
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.SELECT,
  name: 'relationshipStatus',
  label: 'Relationship Status',
  isNullable: true,
  options: [
    { position: 0, label: 'Prospect', value: 'PROSPECT', color: 'blue' },
    { position: 1, label: 'Active Client', value: 'ACTIVE_CLIENT', color: 'green' },
    { position: 2, label: 'Past Client', value: 'PAST_CLIENT', color: 'gray' },
    { position: 3, label: 'Partner', value: 'PARTNER', color: 'purple' },
    { position: 4, label: 'Not a Fit', value: 'NOT_A_FIT', color: 'red' },
  ],
});