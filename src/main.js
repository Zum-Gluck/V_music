import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getApi from '@/api/index'
import utils from './utils/utils'
import './plugins/element.js'
import './assets/styles/common.css';
import './assets/styles/reset.styl'

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

import NiceLoading from './components/common/loading/Index'
Vue.component('niceLoading', NiceLoading)

Vue.prototype.$api = getApi
Vue.prototype.utils = utils

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
