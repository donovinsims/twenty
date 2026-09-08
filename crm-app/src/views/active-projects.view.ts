import { defineView, STANDARD_OBJECT, ViewFilterOperand, ViewType } from 'twenty-sdk/define';

import {
  VIEW_ACTIVE_PROJECTS_UNIVERSAL_IDENTIFIER,
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { clientProjectField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_ACTIVE_PROJECTS_UNIVERSAL_IDENTIFIER,
  name: 'Active Projects',
  objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconBriefcase',
  position: 0,
  fields: [
    { universalIdentifier: '61884083-5dda-4417-81a3-028828047678', fieldMetadataUniversalIdentifier: clientProjectField('name'), position: 0, size: 200 },
    { universalIdentifier: '66e8bf16-7ed6-4af0-a20f-e5263e7efeb6', fieldMetadataUniversalIdentifier: clientProjectField('company'), position: 1, size: 160 },
    { universalIdentifier: 'e7a29fbe-d851-448c-9614-01d6d0209dd2', fieldMetadataUniversalIdentifier: clientProjectField('priority'), position: 2, size: 100 },
    { universalIdentifier: '5c09e818-b15d-4d83-9a34-babfaff3db6d', fieldMetadataUniversalIdentifier: clientProjectField('status'), position: 3, size: 130 },
    { universalIdentifier: '87fdddcc-44a4-4b92-8783-485aad8dfe79', fieldMetadataUniversalIdentifier: clientProjectField('projectValue'), position: 4, size: 110 },
    { universalIdentifier: '8240ecaf-9715-43c2-9ddb-843549b65cc5', fieldMetadataUniversalIdentifier: clientProjectField('nextAction'), position: 5, size: 220 },
    { universalIdentifier: 'e67a7f7c-4c3c-4e77-b231-18ec959f997e', fieldMetadataUniversalIdentifier: clientProjectField('targetCompletionDate'), position: 6, size: 140 },
  ],
  filters: [
    {
      universalIdentifier: '7e0b94cc-ae9f-455b-9dec-037ccf9e0d1d',
      fieldMetadataUniversalIdentifier: clientProjectField('status'),
      operand: ViewFilterOperand.IS,
      value: ['ACTIVE', 'WAITING_ON_ME', 'WAITING_ON_CLIENT', 'BLOCKED', 'REVIEW'],
    },
  ],
});