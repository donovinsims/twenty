import { getFieldUniversalIdentifier } from 'twenty-sdk/define';

import {
  APPLICATION_UNIVERSAL_IDENTIFIER,
  CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
  OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export const clientProjectField = (name: string) =>
  getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
    name,
  });

export const findingField = (name: string) =>
  getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
    name,
  });

export const companyField = (name: string) =>
  getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
    name,
  });

export const opportunityField = (name: string) =>
  getFieldUniversalIdentifier({
    applicationUniversalIdentifier: APPLICATION_UNIVERSAL_IDENTIFIER,
    objectUniversalIdentifier: OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
    name,
  });