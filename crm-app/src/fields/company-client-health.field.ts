import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'clientHealth',
  }),
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.SELECT,
  name: 'clientHealth',
  label: 'Client Health',
  isNullable: true,
  options: [
    { position: 0, label: 'Healthy', value: 'HEALTHY', color: 'green' },
    { position: 1, label: 'Stable', value: 'STABLE', color: 'blue' },
    { position: 2, label: 'Needs Attention', value: 'NEEDS_ATTENTION', color: 'amber' },
    { position: 3, label: 'At Risk', value: 'AT_RISK', color: 'red' },
  ],
});