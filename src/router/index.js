import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: checkAuth,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => import('../views/Notifications.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/Store.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/editUsers',
    name: 'EditUsers',
    component: () => import('../views/EditUsers.vue'),
    beforeEnter: checkAuth,
  },
  {
    path: '/editProducts',
    name: 'EditProducts',
    component: () => import('../views/EditProducts.vue'),
    beforeEnter: checkAuth,
  },
  { 
    path: '*',
    name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function checkAuth (to, from, next) {
  if (localStorage.getItem('token')) {
    next()
  } else if (!localStorage.getItem('token')) {
    next('/')
  } else {
    next('/')
  }
}

export default router
