import { defineView, ViewFilterOperand, ViewType } from 'twenty-sdk/define';

import {
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_WAITING_ON_ME_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { clientProjectField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_WAITING_ON_ME_UNIVERSAL_IDENTIFIER,
  name: 'Waiting on Me',
  objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconUser',
  position: 1,
  fields: [
    { universalIdentifier: '9686a47d-931a-4124-a1aa-26694be29667', fieldMetadataUniversalIdentifier: clientProjectField('name'), position: 0, size: 200 },
    { universalIdentifier: 'ce299014-1b55-4337-b06c-9784896fa4e8', fieldMetadataUniversalIdentifier: clientProjectField('company'), position: 1, size: 160 },
    { universalIdentifier: '3516a3fb-47a3-456e-b461-40e67ce3dd41', fieldMetadataUniversalIdentifier: clientProjectField('priority'), position: 2, size: 100 },
    { universalIdentifier: 'b3909621-406a-48e5-8872-c7ca1d8ff4d3', fieldMetadataUniversalIdentifier: clientProjectField('nextAction'), position: 3, size: 240 },
    { universalIdentifier: 'cd3ef005-7033-4e86-87ad-828fb263dd8b', fieldMetadataUniversalIdentifier: clientProjectField('targetCompletionDate'), position: 4, size: 140 },
  ],
  filters: [
    {
      universalIdentifier: '45da7681-3048-4864-afbf-c45d5807e3c0',
      fieldMetadataUniversalIdentifier: clientProjectField('status'),
      operand: ViewFilterOperand.IS,
      value: ['WAITING_ON_ME'],
    },
  ],
});