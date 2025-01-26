import { ROUTE } from '@/configs/layout-config'
import WordDetailPage from '@/pages/WordDetailPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: ROUTE.HOME, name: 'home', component: HomeView },
    { path: ROUTE.WORD, name: 'word', component: () => import('../pages/WordPage.vue') },
    { path: `${ROUTE.WORD}/:id`, name: 'detail-word', component: WordDetailPage },
    { path: ROUTE.CONFIG, name: 'config', component: () => import('../pages/ConfigPage.vue') },
    { path: ROUTE.LOGIN, name: 'login', component: () => import('../pages/LoginPage.vue') },
  ],
})

export default router
