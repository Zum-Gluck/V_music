import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from 'views/layout/Index.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'home' },
    meta: { title: '首页', keepAlive: true },
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: resolve => {
          require(['views/home/Index'], resolve)
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
})

export default router
