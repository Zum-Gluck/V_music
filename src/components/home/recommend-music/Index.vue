<template>
  <div class="recommend-music">
    <h2 class="title">推荐新歌曲</h2>
    <song-list :songList="songs"></song-list>
  </div>
</template>

<script>
import { createSong } from 'model/song'
import songList from 'components/common/songList/Index.vue'
export default {
  name: '',
  // 组件
  components: {
    songList
  },
  // 变量
  data() {
    return {
      limit: 10,
      songs: []
    }
  },
  // 方法
  methods: {
    async getNewsong() {
      try {
        let res = await this.$api.getNewsongs(this.limit)
        let list = []
        if (res.code == 200) {
          res.result.forEach(item => {
            list.push(item.id)
          })
          // console.log(res);
          this.getSongDetail(list)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async getSongDetail(sliceArr) {
      // 发送post请求需要传递时间戳
      let timestamp = new Date().valueOf()
      // id 集合
      sliceArr = sliceArr.join(',')

      let res = await this.$api.getSongDetail(sliceArr, timestamp)
      this.songs = this._normalizeSongs(res.songs)
      console.log(this.songs)
    },
    // 用于处理歌曲
    _normalizeSongs(list) {
      let ret = []
      list.map(item => {
        if (item.id) {
          // console.log(item);
          ret.push(createSong(item))
        }
      })
      return ret
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.getNewsong()
  }
}
</script>

<style lang="stylus" scoped>
.recommend-music {
  .title {
    margin : 0 0 15px 0;
  }
}
</style>
