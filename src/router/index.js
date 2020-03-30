import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/add-smoothie',
    name: 'AddSmoothie',
    component: () => import('../views/AddSmoothie.vue')
  },{
    path: '/edit-smoothie/:smoothieSlug',
    name: 'EditSmoothie',
    component: () => import('../views/EditSmoothie.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
