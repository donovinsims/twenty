import {
  defineField,
  FieldType,
  getFieldUniversalIdentifier,
  getSystemRelationFieldUniversalIdentifier,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  TASK_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getSystemRelationFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
    relationTargetObjectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  }),
  objectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.RELATION,
  name: 'clientProject',
  label: 'Client Project',
  isNullable: true,
  relationTargetFieldMetadataUniversalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'tasks',
  }),
  relationTargetObjectMetadataUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  universalSettings: {
    relationType: RelationType.MANY_TO_ONE,
    onDelete: OnDeleteAction.SET_NULL,
    joinColumnName: 'clientProjectId',
  },
});