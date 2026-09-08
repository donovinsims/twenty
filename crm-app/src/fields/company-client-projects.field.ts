import {
  defineField,
  FieldType,
  getFieldUniversalIdentifier,
  getSystemRelationFieldUniversalIdentifier,
  RelationType,
} from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getSystemRelationFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    relationTargetObjectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  }),
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'clientProjects',
  label: 'Client Projects',
  isNullable: true,
  relationTargetFieldMetadataUniversalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'company',
  }),
  relationTargetObjectMetadataUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.ONE_TO_MANY,
  },
});