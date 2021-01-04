<template>
  <div class="home-wrap container">
    <banner></banner>
    <recommend-songs></recommend-songs>
    <recommend-music></recommend-music>
    <recommend-singer></recommend-singer>
  </div>
</template>

<script>
import Banner from 'components/home/banner/Index'
import RecommendSongs from 'components/home/recommend-songs/Index'
import RecommendMusic from 'components/home/recommend-music/Index'
import RecommendSinger from 'components/home/recommend-singer/Index'

export default {
  components: {
    Banner,
    RecommendSongs,
    RecommendMusic,
    RecommendSinger
  }
}
</script>

<style lang="stylus" scoped></style>
