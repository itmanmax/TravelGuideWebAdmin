import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import Service from '@/pages/Service.vue'
import Statistics from '@/pages/Statistics.vue'
import UserService from '@/pages/UserService.vue'
import Destinations from '@/pages/Destinations.vue'
import Posts from '@/pages/Posts.vue'
import Users from '@/pages/Users.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/service',
    name: 'Service',
    component: Service,
    meta: { requiresAuth: true }
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics,
    meta: { requiresAuth: true }
  },
  {
    path: '/personal-service',
    name: 'PersonalService',
    component: UserService,
    meta: { requiresAuth: true }
  },
  {
    path: '/destinations',
    name: 'Destinations',
    component: Destinations,
    meta: { requiresAuth: true }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore()
  const requiresAuth = to.meta.requiresAuth as boolean

  // 如果未认证但有token，尝试恢复会话
  if (!userStore.isAuthenticated && localStorage.getItem('token')) {
    userStore.restoreUserSession()
  }

  console.log('Route guard:', {
    to: to.path,
    requiresAuth,
    isAuthenticated: userStore.isAuthenticated
  })

  if (requiresAuth && !userStore.isAuthenticated) {
    console.log('Redirecting to login - not authenticated')
    next('/login')
  } else if (to.path === '/login' && userStore.isAuthenticated) {
    console.log('Redirecting to profile - already authenticated')
    next('/profile')
  } else {
    next()
  }
})

export default router 