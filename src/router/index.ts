import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentUser } from 'vuefire';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginFirebase.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: false }

    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import("../views/DetailView.vue"),
      meta: { requiresAuth: true }

    }
  ]
})

router.beforeEach(async (to, from) => {
  const currentUser = await getCurrentUser()
  if (to.meta.requiresAuth && !currentUser) {
    return { name: 'login' }
  }
})

export default router
