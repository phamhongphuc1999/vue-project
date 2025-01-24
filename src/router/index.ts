import { ROUTE } from '@/configs/layout-config'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: ROUTE.HOME, name: 'home', component: HomeView },
    { path: ROUTE.WORD, name: 'word', component: () => import('../pages/WordPage.vue') },
    { path: ROUTE.CONFIG, name: 'config', component: () => import('../pages/ConfigPage.vue') },
  ],
})

export default router
