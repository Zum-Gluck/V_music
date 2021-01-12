import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/common.css';
import './assets/styles/reset.styl'
import './plugins/element.js'
import './plugins/swiper.js'
import './plugins/kinesis.js'

import getApi from '@/api/index'
Vue.prototype.$api = getApi

import utils from './utils/utils'
Vue.prototype.utils = utils

import NiceLoading from './components/common/loading/Index'
Vue.component('niceLoading', NiceLoading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
