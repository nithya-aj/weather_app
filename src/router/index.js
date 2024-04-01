import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: () => import('../components/LoginPage.vue')
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: () => import('../components/SignupPage.vue')
    }
  ]
})

export default router
