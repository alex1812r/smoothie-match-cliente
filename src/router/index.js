import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Smoothies from '../views/Smoothies.vue';
import CreateSmoothie from '../views/CreateSmoothie.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create-smoothie',
    name: 'create-smoothie',
    component: CreateSmoothie
  },
  {
    path: '/smoothies',
    name: 'about',
    component: Smoothies
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
