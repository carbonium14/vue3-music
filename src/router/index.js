import { createRouter, createWebHistory } from 'vue-router'
const Recommend=()=>import('@/views/Recommend.vue'/* webpackChunkName: "Recommend" */)
const Singer=()=>import('@/views/Singer.vue'/* webpackChunkName: "Singer" */)
const TopList=()=>import('@/views/TopList.vue'/* webpackChunkName: "TopList" */)
const Search=()=>import('@/views/Search.vue'/* webpackChunkName: "Search" */)
const SingerDetail=()=>import('@/views/SingerDetail.vue'/* webpackChunkName: "SingerDetail" */)
const Album=()=>import('@/views/Album.vue'/* webpackChunkName: "Album" */)
const TopDetail=()=>import('@/views/TopDetail.vue'/* webpackChunkName: "TopDetail" */)
const UserCenter=()=>import('@/views/UserCenter.vue'/* webpackChunkName: "UserCenter" */)
const routes = [
  {
    path:'/',
    redirect:'/recommend'
  },
  {
    path:'/recommend',
    component:Recommend,
    children:[{
      path:':id',
      component:Album
    }]
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
    component:TopList,
    children:[{
      path:':id',
      component:TopDetail
    }]
  },
  {
    path:'/search',
    component:Search,
    children:[{
      path:':id',
      component:SingerDetail
    }]
  },
  {
    path:'/user',
    components:{
      user:UserCenter
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
