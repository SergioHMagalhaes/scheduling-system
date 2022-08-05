import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'
import search from '../views/search.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: home,
  },
  {
    path: '/search',
    name: 'Search',
    component: search,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
