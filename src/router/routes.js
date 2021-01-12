import Layout from 'views/layout/Index.vue'

export const routes = [
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
      },
      {
        path: '/rank',
        name: 'rank',
        meta: {
          title: '排行榜',
          keepAlive: true
        },
        component: resolve => {
          require(['views/rank/Index'], resolve)
        }
      },
      {
        path: '/playlist',
        name: 'playlist',
        meta: {
          title: '歌单',
          keepAlive: true
        },
        component: resolve => {
          require(['views/playlist/Index'], resolve)
        }
      },
      {
        path: '/palylist-detail',
        name: 'palylistDetail',
        meta: {
          title: '歌单详情',
          keepAlive: true
        },
        component: resolve => {
          require(['views/playlist/detail/Index'], resolve)
        }
      },
      {
        path: '/singer',
        name: 'singer',
        meta: {
          title: '歌手',
          keepAlive: true
        },
        component: resolve => {
          require(['views/singer/Index'], resolve)
        }
      },
      {
        path: '/singer-detail',
        name: 'singerDetail',
        meta: {
          title: '详情',
          keepAlive: true
        },
        component: resolve => {
          require(['views/singer/detail/Index'], resolve)
        }
      },
      {
        path: '/video',
        name: 'video',
        meta: {
          title: '歌手',
          keepAlive: true
        },
        component: resolve => {
          require(['views/video/Index'], resolve)
        }
      },
      {
        path: '/mv',
        name: 'mv',
        meta: {
          title: '歌手',
          keepAlive: true
        },
        component: resolve => {
          require(['views/mv/Index'], resolve)
        }
      },
      {
        path: '/search',
        name: 'search',
        meta: {
          title: '搜索',
          keepAlive: true
        },
        component: resolve => {
          require(['views/search/Index'], resolve)
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      keepAlive: true,
      isLogin: true
    },
    component: resolve => {
      require(['views/login/Index'], resolve)
    }
  }
]