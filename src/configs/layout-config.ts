import type { LayoutType } from '@/global'

export const ROUTE = {
  HOME: '/',
  WORD: '/word',
  CONFIG: '/config',
}

export const LayoutConfig: Array<LayoutType> = [
  { id: 'home', title: 'page.home', icon: 'pi pi-home', link: ROUTE.HOME },
  { id: 'word', title: 'page.word', icon: 'pi pi-file-word', link: ROUTE.WORD },
  { id: 'config', title: 'page.config', icon: 'pi pi-cog', link: ROUTE.CONFIG },
]
