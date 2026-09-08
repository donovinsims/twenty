import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: FOLDER_OPERATIONS_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.FOLDER,
  name: 'Operations',
  icon: 'IconFolder',
  color: 'sky',
  position: 0,
});