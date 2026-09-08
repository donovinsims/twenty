import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  NAV_PROBLEMS_DISCOVERED_UNIVERSAL_IDENTIFIER,
  VIEW_PROBLEMS_DISCOVERED_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_PROBLEMS_DISCOVERED_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: VIEW_PROBLEMS_DISCOVERED_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  icon: 'IconBulb',
  color: 'sky',
  position: 7,
});