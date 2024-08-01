import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'
import store from '@/store'

const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const Searchlist = () => import('@/views/search/list')
const Goods = () => import('@/views/goods')
const Pay = () => import('@/views/pay')
const Order = () => import('@/views/order')
const Address = () => import('@/views/address/index')
const Addressedit = () => import('@/views/address/edit')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'home',
      children: [
        { path: 'home', component: Home },
        { path: 'category', component: Category },
        { path: 'cart', component: Cart },
        { path: 'user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/search', component: Search },
    { path: '/searchlist', component: Searchlist },
    { path: '/goods/:id', component: Goods },
    { path: '/pay', component: Pay },
    { path: '/order', component: Order },
    { path: '/address', component: Address },
    { path: '/addressedit', component: Addressedit }
  ]
})

// 设置路由前置守卫，登录访问拦截
const authUrl = ['/pay', '/order']
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if (!authUrl.includes(to.path)) {
    next()
    return
  }
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
