import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  NAV_MONEY_OUTSTANDING_UNIVERSAL_IDENTIFIER,
  VIEW_MONEY_OUTSTANDING_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_MONEY_OUTSTANDING_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: VIEW_MONEY_OUTSTANDING_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  icon: 'IconCash',
  color: 'sky',
  position: 4,
});