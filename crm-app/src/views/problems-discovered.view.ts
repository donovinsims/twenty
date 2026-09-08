import { defineView, ViewFilterOperand, ViewType } from 'twenty-sdk/define';

import {
  OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_PROBLEMS_DISCOVERED_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { findingField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_PROBLEMS_DISCOVERED_UNIVERSAL_IDENTIFIER,
  name: 'Problems Discovered',
  objectUniversalIdentifier: OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconBulb',
  position: 0,
  fields: [
    { universalIdentifier: 'cd34d831-ffe7-4982-bed8-cc67cf8ccbe4', fieldMetadataUniversalIdentifier: findingField('name'), position: 0, size: 220 },
    { universalIdentifier: '526420cb-a78f-498e-9f05-f72a84d49783', fieldMetadataUniversalIdentifier: findingField('company'), position: 1, size: 160 },
    { universalIdentifier: '05b99789-10ef-424d-8722-98f41cd4be1a', fieldMetadataUniversalIdentifier: findingField('area'), position: 2, size: 140 },
    { universalIdentifier: '9dd9d26e-8f18-4879-8204-46ca730a7230', fieldMetadataUniversalIdentifier: findingField('status'), position: 3, size: 130 },
    { universalIdentifier: 'e65985a3-ed0d-4dfc-8987-14a5e60c1c15', fieldMetadataUniversalIdentifier: findingField('automationOpportunity'), position: 4, size: 90 },
    { universalIdentifier: '0cb2c5d8-4779-4c0b-8c79-1aed896003e4', fieldMetadataUniversalIdentifier: findingField('possibleSolution'), position: 5, size: 220 },
  ],
  filters: [
    {
      universalIdentifier: '45fd4708-2154-4841-98d1-0c5fb7b29788',
      fieldMetadataUniversalIdentifier: findingField('status'),
      operand: ViewFilterOperand.IS,
      value: ['OBSERVED', 'INVESTIGATING', 'DISCUSSED'],
    },
  ],
});