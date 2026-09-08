import { defineField, FieldType, getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineField({
  universalIdentifier: getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    name: 'businessType',
  }),
  objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  type: FieldType.SELECT,
  name: 'businessType',
  label: 'Business Type',
  isNullable: true,
  options: [
    { position: 0, label: 'Restaurant', value: 'RESTAURANT', color: 'orange' },
    { position: 1, label: 'HVAC', value: 'HVAC', color: 'sky' },
    { position: 2, label: 'Plumbing', value: 'PLUMBING', color: 'cyan' },
    { position: 3, label: 'Roofing', value: 'ROOFING', color: 'amber' },
    { position: 4, label: 'Auto Repair', value: 'AUTO_REPAIR', color: 'purple' },
    { position: 5, label: 'Contractor', value: 'CONTRACTOR', color: 'blue' },
    { position: 6, label: 'Salon', value: 'SALON', color: 'pink' },
    { position: 7, label: 'Local Service', value: 'LOCAL_SERVICE', color: 'green' },
    { position: 8, label: 'Retail', value: 'RETAIL', color: 'gold' },
    { position: 9, label: 'Other', value: 'OTHER', color: 'gray' },
  ],
});