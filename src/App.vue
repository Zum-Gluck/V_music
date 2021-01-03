<template>
  <div id="app">
    <nice-header></nice-header>
    <router-view />
    <player-bar></player-bar>
  </div>
</template>

<script>
import NiceHeader from './components/common/header/Index'
import PlayerBar from './components/common/playerBar/Index'
export default {
  name: 'app',
  components: {
    NiceHeader,
    PlayerBar
  }
}
</script>
<style lang="stylus" scoped>
@import './assets/styles/iconfont.css';

</style>
