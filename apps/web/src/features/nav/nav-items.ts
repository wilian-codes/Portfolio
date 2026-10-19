export type NavItem = {
  id: string
  label: string
}

// Same order as the sections appear on the home page.
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export const MOBILE_MENU_ID = 'mobile-menu'
