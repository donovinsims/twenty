import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import {
  FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  NAV_OPPORTUNITIES_UNIVERSAL_IDENTIFIER,
  OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_OPPORTUNITIES_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: OPPORTUNITY_OBJECT_UNIVERSAL_IDENTIFIER,
  folderUniversalIdentifier: FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  icon: 'IconTarget',
  color: 'green',
  position: 2,
});