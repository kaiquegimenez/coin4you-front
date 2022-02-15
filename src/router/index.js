import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/notifications',
  //   name: 'Notifications',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Notifications.vue')
  // },
  {
    path: '/store',
    name: 'Store',
    component: () => import(/* webpackChunkName: "about" */ '../views/Store.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/editUsers',
    name: 'EditUsers',
    component: () => import('../views/EditUsers.vue')
  },
  {
    path: '/editProducts',
    name: 'EditProducts',
    component: () => import('../views/EditProducts.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
