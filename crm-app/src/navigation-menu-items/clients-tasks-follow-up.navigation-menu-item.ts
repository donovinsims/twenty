import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  NAV_TASKS_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
  VIEW_TASKS_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_TASKS_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: VIEW_TASKS_FOLLOW_UP_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  icon: 'IconUserCheck',
  color: 'green',
  position: 4,
});