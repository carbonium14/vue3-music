import { createRouter, createWebHistory } from 'vue-router'
import Recommend from '@/views/Recommend.vue'
import Singer from '@/views/Singer.vue'
import TopList from '@/views/TopList.vue'
import Search from '@/views/Search.vue'
import SingerDetail from '@/views/SingerDetail.vue'
const routes = [
  {
    path:'/',
    redirect:'/recommend'
  },
  {
    path:'/recommend',
    component:Recommend
  },
  {
    path:'/singer',
    component:Singer,
    children:[{
      path:':id',
      component:SingerDetail
    }]
  },
  {
    path:'/top-list',
    component:TopList
  },
  {
    path:'/search',
    component:Search
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
