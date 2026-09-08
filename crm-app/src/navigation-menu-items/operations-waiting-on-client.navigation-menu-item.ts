import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  NAV_WAITING_ON_CLIENT_UNIVERSAL_IDENTIFIER,
  VIEW_WAITING_ON_CLIENT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_WAITING_ON_CLIENT_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: VIEW_WAITING_ON_CLIENT_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  icon: 'IconClock',
  color: 'sky',
  position: 2,
});