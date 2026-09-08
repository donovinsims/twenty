import { defineView, ViewFilterOperand, ViewSortDirection, ViewType } from 'twenty-sdk/define';

import {
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_MONEY_OUTSTANDING_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { clientProjectField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_MONEY_OUTSTANDING_UNIVERSAL_IDENTIFIER,
  name: 'Money Outstanding',
  objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconCash',
  position: 4,
  fields: [
    { universalIdentifier: '819b04a4-db6d-4cdf-beff-2b05ebd91f85', fieldMetadataUniversalIdentifier: clientProjectField('name'), position: 0, size: 200 },
    { universalIdentifier: '1d62aace-b931-4574-83a9-98a24c1941a6', fieldMetadataUniversalIdentifier: clientProjectField('company'), position: 1, size: 160 },
    { universalIdentifier: 'c63f6689-19b0-418f-b7fa-c7a7494b4610', fieldMetadataUniversalIdentifier: clientProjectField('projectValue'), position: 2, size: 110 },
    { universalIdentifier: '117c0024-c5d3-49b9-8de4-aa82d0594672', fieldMetadataUniversalIdentifier: clientProjectField('amountPaid'), position: 3, size: 110 },
    { universalIdentifier: '361db466-3b42-4437-8166-d5b6ae123c34', fieldMetadataUniversalIdentifier: clientProjectField('paymentStatus'), position: 4, size: 130 },
    { universalIdentifier: '12b8ab3d-75da-47f1-b62f-4305b5f1b6b6', fieldMetadataUniversalIdentifier: clientProjectField('nextPaymentDue'), position: 5, size: 140 },
  ],
  filters: [
    {
      universalIdentifier: '045ea4cf-161b-464a-9e7b-91e371dc13ad',
      fieldMetadataUniversalIdentifier: clientProjectField('paymentStatus'),
      operand: ViewFilterOperand.IS,
      value: ['DEPOSIT_DUE', 'PARTIALLY_PAID', 'OVERDUE'],
    },
  ],
  sorts: [
    {
      universalIdentifier: '55af4c58-3add-4281-9e21-5ff768b7c885',
      fieldMetadataUniversalIdentifier: clientProjectField('nextPaymentDue'),
      direction: ViewSortDirection.ASC,
    },
  ],
});