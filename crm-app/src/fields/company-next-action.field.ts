import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'nextAction',
  }),
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.TEXT,
  name: 'nextAction',
  label: 'Next Action',
  isNullable: true,
});