import { createRouter, createWebHistory } from 'vue-router'
import MobileOrBrowser from '@/views/MobileOrBrowser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MobileOrBrowser
    }
  ]
})

export default router
