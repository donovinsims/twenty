import { defineView, STANDARD_OBJECT, ViewFilterOperand, ViewType } from 'twenty-sdk/define';

import {
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_ACTIVE_CLIENTS_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import {
  companyField,
} from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_ACTIVE_CLIENTS_UNIVERSAL_IDENTIFIER,
  name: 'Active Clients',
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconHeartHandshake',
  position: 1,
  fields: [
    { universalIdentifier: 'dc88a9c9-bbe6-4826-a6d6-c4be4c9d9a0c', fieldMetadataUniversalIdentifier: STANDARD_OBJECT.company.fields.name.universalIdentifier, position: 0, size: 180 },
    { universalIdentifier: 'be601bb3-a252-4c5a-b4a6-fcf41ae60a3c', fieldMetadataUniversalIdentifier: companyField('businessType'), position: 1, size: 110 },
    { universalIdentifier: '81d5a0f8-78fa-4f29-a818-00bafcf4fb72', fieldMetadataUniversalIdentifier: companyField('clientHealth'), position: 2, size: 120 },
    { universalIdentifier: 'a618f287-bf9b-4d1e-b9ae-0e68a003eeb1', fieldMetadataUniversalIdentifier: companyField('nextAction'), position: 3, size: 240 },
  ],
  filters: [
    {
      universalIdentifier: 'a0ab57b3-d3c0-4daa-b94c-520199e80b5c',
      fieldMetadataUniversalIdentifier: companyField('relationshipStatus'),
      operand: ViewFilterOperand.IS,
      value: ['ACTIVE_CLIENT'],
    },
  ],
});