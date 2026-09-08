import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  NAV_ACTIVE_PROJECTS_UNIVERSAL_IDENTIFIER,
  VIEW_ACTIVE_PROJECTS_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_ACTIVE_PROJECTS_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.VIEW,
  viewUniversalIdentifier: VIEW_ACTIVE_PROJECTS_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  icon: 'IconBriefcase',
  color: 'sky',
  position: 0,
});