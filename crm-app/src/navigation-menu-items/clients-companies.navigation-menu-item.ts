import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  NAV_COMPANIES_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_COMPANIES_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: COMPANY_OBJECT_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  icon: 'IconBuilding',
  color: 'green',
  position: 0,
});