import { defineView, ViewFilterOperand, ViewType } from 'twenty-sdk/define';

import {
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  VIEW_COMPLETED_WORK_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';
import { clientProjectField } from 'src/constants/field-universal-identifiers';

export default defineView({
  universalIdentifier: VIEW_COMPLETED_WORK_UNIVERSAL_IDENTIFIER,
  name: 'Completed Work',
  objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  type: ViewType.TABLE,
  icon: 'IconCircleCheck',
  position: 5,
  fields: [
    { universalIdentifier: '14381c82-ec07-45cc-b055-bb5cb20058c0', fieldMetadataUniversalIdentifier: clientProjectField('name'), position: 0, size: 200 },
    { universalIdentifier: 'e8f5e58c-e133-41d9-afb4-7dfb46320507', fieldMetadataUniversalIdentifier: clientProjectField('company'), position: 1, size: 160 },
    { universalIdentifier: '8816ef35-30f1-47af-8065-a6fa41eda165', fieldMetadataUniversalIdentifier: clientProjectField('paymentStatus'), position: 2, size: 130 },
    { universalIdentifier: 'd0065dde-9530-478b-b8e5-e908b88d693f', fieldMetadataUniversalIdentifier: clientProjectField('amountPaid'), position: 3, size: 110 },
    { universalIdentifier: 'c921ed28-e211-464c-90f4-b77c873a9dc5', fieldMetadataUniversalIdentifier: clientProjectField('paidDate'), position: 4, size: 130 },
  ],
  filters: [
    {
      universalIdentifier: '69e547aa-1cdc-41af-963b-aa81f1c0bc1b',
      fieldMetadataUniversalIdentifier: clientProjectField('status'),
      operand: ViewFilterOperand.IS,
      value: ['DELIVERED', 'COMPLETED'],
    },
  ],
});