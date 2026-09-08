import {
  defineObject,
  FieldType,
  getFieldUniversalIdentifier,
  OnDeleteAction,
  RelationType,
} from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  PROJECT_DECISION_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

const f = (name: string) =>
  getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: PROJECT_DECISION_OBJECT_UNIVERSAL_IDENTIFIER,
    name,
  });

export default defineObject({
  universalIdentifier: PROJECT_DECISION_OBJECT_UNIVERSAL_IDENTIFIER,
  nameSingular: 'projectDecision',
  namePlural: 'projectDecisions',
  labelSingular: 'Project Decision',
  labelPlural: 'Project Decisions',
  description: 'A decision made on a client project, so context is never lost between meetings.',
  icon: 'IconDecision',
  isSearchable: true,
  isUICreatable: true,
  isUIEditable: true,
  fields: [
    {
      universalIdentifier: f('name'),
      type: FieldType.TEXT,
      name: 'name',
      label: 'Decision',
      isNullable: true,
    },
    {
      universalIdentifier: f('clientProject'),
      type: FieldType.RELATION,
      name: 'clientProject',
      label: 'Client Project',
      isNullable: true,
      relationTargetFieldMetadataUniversalIdentifier: getFieldUniversalIdentifier({
        applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
        objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
        name: 'decisions',
      }),
      relationTargetObjectMetadataUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
      universalSettings: {
        relationType: RelationType.MANY_TO_ONE,
        onDelete: OnDeleteAction.CASCADE,
        joinColumnName: 'clientProjectId',
      },
    },
    {
      universalIdentifier: f('decisionDetail'),
      type: FieldType.RICH_TEXT,
      name: 'decisionDetail',
      label: 'Decision Detail',
      isNullable: true,
    },
    {
      universalIdentifier: f('decidedAt'),
      type: FieldType.DATE_TIME,
      name: 'decidedAt',
      label: 'Decided On',
      isNullable: true,
    },
    {
      universalIdentifier: f('decidedBy'),
      type: FieldType.TEXT,
      name: 'decidedBy',
      label: 'Decided By',
      isNullable: true,
    },
    {
      universalIdentifier: f('notes'),
      type: FieldType.TEXT,
      name: 'notes',
      label: 'Notes',
      isNullable: true,
    },
  ],
});