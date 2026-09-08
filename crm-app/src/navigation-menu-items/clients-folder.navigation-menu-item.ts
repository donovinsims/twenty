import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: FOLDER_CLIENTS_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.FOLDER,
  name: 'Clients',
  icon: 'IconFolder',
  color: 'green',
  position: 1,
});