import { defineView, ViewFilterOperand, ViewType } from 'twenty-sdk/define';

import {
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_BLOCKED_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { clientProjectField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_BLOCKED_UNIVERSAL_IDENTIFIER,
  name: 'Blocked',
  objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconShieldX',
  position: 3,
  fields: [
    { universalIdentifier: 'e8c1767a-e6ab-461f-aa34-ad466f767d3a', fieldMetadataUniversalIdentifier: clientProjectField('name'), position: 0, size: 200 },
    { universalIdentifier: '0002903a-a24e-4ac3-ba74-3770279a15f3', fieldMetadataUniversalIdentifier: clientProjectField('company'), position: 1, size: 160 },
    { universalIdentifier: 'd9f2da63-9457-419a-8d76-7eb6d20b43f3', fieldMetadataUniversalIdentifier: clientProjectField('priority'), position: 2, size: 100 },
    { universalIdentifier: 'b834db01-2591-477b-b791-8fab04561286', fieldMetadataUniversalIdentifier: clientProjectField('blockedReason'), position: 3, size: 260 },
    { universalIdentifier: '4772c449-fc6f-46ee-a4b3-5e5e7dddeb82', fieldMetadataUniversalIdentifier: clientProjectField('waitingOn'), position: 4, size: 200 },
  ],
  filters: [
    {
      universalIdentifier: '83283350-6ea1-4a07-b368-81352e444eea',
      fieldMetadataUniversalIdentifier: clientProjectField('status'),
      operand: ViewFilterOperand.IS,
      value: ['BLOCKED'],
    },
  ],
});