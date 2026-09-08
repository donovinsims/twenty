import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'currentSystems',
  }),
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.MULTI_SELECT,
  name: 'currentSystems',
  label: 'Current Systems',
  isNullable: true,
  options: [
    { position: 0, label: 'Toast', value: 'TOAST', color: 'orange' },
    { position: 1, label: 'Square', value: 'SQUARE', color: 'green' },
    { position: 2, label: 'Clover', value: 'CLOVER', color: 'blue' },
    { position: 3, label: 'QuickBooks', value: 'QUICKBOOKS', color: 'red' },
    { position: 4, label: 'Gmail', value: 'GMAIL', color: 'yellow' },
    { position: 5, label: 'Google Business Profile', value: 'GOOGLE_BUSINESS_PROFILE', color: 'sky' },
    { position: 6, label: 'WordPress', value: 'WORDPRESS', color: 'purple' },
    { position: 7, label: 'Wix', value: 'WIX', color: 'cyan' },
    { position: 8, label: 'Shopify', value: 'SHOPIFY', color: 'jade' },
    { position: 9, label: 'Instagram', value: 'INSTAGRAM', color: 'pink' },
    { position: 10, label: 'Facebook', value: 'FACEBOOK', color: 'blue' },
    { position: 11, label: 'None', value: 'NONE', color: 'gray' },
    { position: 12, label: 'Other', value: 'OTHER', color: 'gray' },
  ],
});