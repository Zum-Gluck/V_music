import Vue from 'vue'
import App from './App.vue'
import router from './router'
import getApi from '@/api/index'
import './plugins/element.js'
import './assets/styles/common.css';
import './assets/styles/reset.styl'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false


Vue.prototype.$api = getApi

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
