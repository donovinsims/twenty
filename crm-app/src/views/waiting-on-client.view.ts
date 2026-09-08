import { defineView, ViewFilterOperand, ViewType } from 'twenty-sdk/define';

import {
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_WAITING_ON_CLIENT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { clientProjectField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_WAITING_ON_CLIENT_UNIVERSAL_IDENTIFIER,
  name: 'Waiting on Client',
  objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconClock',
  position: 2,
  fields: [
    { universalIdentifier: 'e294fae4-785a-45a4-b101-3eabeb618d3a', fieldMetadataUniversalIdentifier: clientProjectField('name'), position: 0, size: 200 },
    { universalIdentifier: '7fc575be-3cde-432b-9a92-fab002ac9d9e', fieldMetadataUniversalIdentifier: clientProjectField('company'), position: 1, size: 160 },
    { universalIdentifier: '21ec1c5c-a6e4-4102-834a-4db302365907', fieldMetadataUniversalIdentifier: clientProjectField('status'), position: 2, size: 130 },
    { universalIdentifier: '8644fee5-f3fd-4696-bfa2-ddff4bc76536', fieldMetadataUniversalIdentifier: clientProjectField('waitingOn'), position: 3, size: 220 },
    { universalIdentifier: '09fd908d-5fec-4185-9fe7-c538c6125253', fieldMetadataUniversalIdentifier: clientProjectField('nextAction'), position: 4, size: 240 },
  ],
  filters: [
    {
      universalIdentifier: '87784096-556d-4a22-a09d-32782b55fe31',
      fieldMetadataUniversalIdentifier: clientProjectField('status'),
      operand: ViewFilterOperand.IS,
      value: ['WAITING_ON_CLIENT'],
    },
  ],
});