import { defineNavigationMenuItem, NavigationMenuItemType } from 'twenty-sdk/define';

import { NAV_FINDINGS_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';
import { OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineNavigationMenuItem({
  universalIdentifier: NAV_FINDINGS_UNIVERSAL_IDENTIFIER,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: OPERATIONAL_FINDING_OBJECT_UNIVERSAL_IDENTIFIER,
  icon: 'IconBulb',
  position: 3,
});