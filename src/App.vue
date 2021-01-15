<template>
  <div id="app">
    <nice-header v-if="!$route.meta.isLogin"></nice-header>
    <router-view />
    <nice-footer v-if="!$route.meta.isLogin"></nice-footer>
    <player-bar v-if="!$route.meta.isLogin"></player-bar>
  </div>
</template>

<script>
import NiceHeader from './components/common/header/Index'
import PlayerBar from './components/common/playerBar/Index'
import NiceFooter from './components/common/footer/Index'
export default {
  name: 'app',
  components: {
    NiceHeader,
    PlayerBar,
    NiceFooter
  }
}
</script>
<style lang="stylus" scoped>
@import './assets/styles/iconfont.css';

</style>
