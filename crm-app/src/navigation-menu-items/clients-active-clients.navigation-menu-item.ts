import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  NAV_ACTIVE_CLIENTS_UNIVERSAL_IDENTIFIER,
  VIEW_ACTIVE_CLIENTS_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_ACTIVE_CLIENTS_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: VIEW_ACTIVE_CLIENTS_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  icon: 'IconHeartHandshake',
  color: 'green',
  position: 1,
});