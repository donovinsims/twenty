import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { NAV_CLIENT_PROJECTS_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_CLIENT_PROJECTS_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: CLIENT_PROJECT_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconBriefcase',
  position: 2,
});