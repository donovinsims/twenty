import {
  defineField,
  FieldType,
  getFieldUniversalIdentifier,
  getSystemRelationFieldUniversalIdentifier,
  RelationType,
} from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getSystemRelationFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    relationTargetObjectUniversalIdentifier: OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
  }),
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'operationalFindings',
  label: 'Findings',
  isNullable: true,
  relationTargetFieldMetadataUniversalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'company',
  }),
  relationTargetObjectMetadataUniversalIdentifier: OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});