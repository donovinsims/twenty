import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  NAV_TASKS_UNIVERSAL_IDENTIFIER,
  TASK_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_TASKS_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: TASK_OBJECT_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  icon: 'IconListCheck',
  color: 'green',
  position: 3,
});