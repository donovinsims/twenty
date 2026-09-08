import {
  defineView,
  STANDARD_OBJECT,
  ViewFilterOperand,
  ViewType,
} from 'twenty-sdk/define';

import {
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { companyField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
  name: 'Follow Up',
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconMessage',
  position: 0,
  fields: [
    { universalIdentifier: '9f08aa58-8265-4fc1-97b8-fae794f3dcae', fieldMetadataUniversalIdentifier: STANDARD_OBJECT.company.fields.name.universalIdentifier, position: 0, size: 180 },
    { universalIdentifier: '7ea645fa-39e1-47eb-838a-1e17bb66dca2', fieldMetadataUniversalIdentifier: companyField('businessType'), position: 1, size: 110 },
    { universalIdentifier: '2677fe13-a725-4fed-b0ca-a20c7fd43f93', fieldMetadataUniversalIdentifier: companyField('nextAction'), position: 2, size: 260 },
  ],
  filters: [
    {
      universalIdentifier: '478e2a5c-6932-4a44-aa49-a9b545579b88',
      fieldMetadataUniversalIdentifier: companyField('nextAction'),
      operand: ViewFilterOperand.IS_NOT_EMPTY,
      value: '',
    },
  ],
});