
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: () => import('@/views/login/index.vue') },
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/layout/home/HomeIndex.vue')
      },
      {
        path: 'cate',
        component: () => import('@/views/layout/category/CateGory.vue')
      },
      {
        path: 'shop',
        component: () => import('@/views/layout/shop/ShopIndex.vue')
      },
      {
        path: 'my',
        component: () => import('@/views/layout/my/MyIndex.vue')
      }
    ]
  },
  { path: '/goods', component: () => import('@/views/goods/index.vue') },
  { path: '/pay', component: () => import('@/views/pay/index.vue') },
  { path: '/search', component: () => import('@/views/search/index.vue') },
  // 动态路由传参
  { path: '/searchlist/:id', component: () => import('@/views/search/searchList.vue') },
  { path: '/myorder', component: () => import('@/views/pay/MyOrder.vue') }
]

const router = new VueRouter({
  routes
})
// 全局前置导航守卫
const arr = ['/pay', '/myorder']
router.beforeEach((to, from, next) => {
  if (arr.includes(to.path)) {
    next()
  } else {
    next()
  }
})

export default router
