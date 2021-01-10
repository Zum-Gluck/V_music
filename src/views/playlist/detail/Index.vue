<template>
  <div>
    <h1>歌单详情</h1>
  </div>
</template>

<script>
import { createSong } from 'model/song'
export default {
  name: '',
  // 组件
  components: {},
  // 变量
  data() {
    return {
      id: 0,
      detail: [], // 歌单详情
      creator: {} // 创建者
    }
  },
  // 方法
  methods: {
    // 获取歌曲id
    async getPlayListDetail(id, s) {
      let timestamp = new Date().valueOf()
      let res = await this.$api.getPlayListDetail(id, s, timestamp)
      if (res.code == 200) {
        if (res.playlist.description != null) {
          // console.log(res.playlist.description)
          // 替换字符串
          res.playlist.description = res.playlist.description.replace(
            /(\r\n|\n\r)/gm,
            '<br />'
          )
        }
        this.detail = res.playlist
        this.creator = res.playlist.creator
        let trackIds = res.playlist.trackIds
        // 数量超过一千，进行分割
        let arrLength = 1000
        let sliceArr = []
        for (let i = 0; i < trackIds.length; i += arrLength) {
          sliceArr.push(trackIds.slice(i, i + arrLength))
        }
        this.getSongDetail(sliceArr)
      }
    },
    // 获取歌曲详情
    async getSongDetail(sliceArr) {
      let before = sliceArr[0]
      let after = sliceArr[1]
      let timestamp = new Date().valueOf()
      let beforeIds = []
      let afterIds = []
      before.forEach(item => {
        beforeIds.push(item.id)
      })
      beforeIds = beforeIds.join(',')
      if (after) {
        after.forEach(item => {
          afterIds.push(item.id)
        })
        afterIds = afterIds.join(',')
      }
      try {
        if (after) {
          let beforeRes = await this.$api.getSongDetail(beforeIds, timestamp)
          let afterRes = await this.$api.getSongDetail(afterIds, timestamp + 1)
          let res = beforeRes.songs.concat(afterRes.songs)
          this.songs = this._normalizeSongs(res.songs)
        } else {
          let beforeRes = await this.$api.getSongDetail(beforeIds, timestamp)
          let res = beforeRes
          this.songs = this._normalizeSongs(res.songs)
          console.log(this.songs);
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 处理歌曲
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        ret.push(createSong(item))
      })
      return ret
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {
    $route() {
      this.id = this.$route.query.id
      this.getPlayListDetail(this.id, 100)
    }
  },
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.id = this.$route.query.id
    this.getPlayListDetail(this.id, 100)
  }
}
</script>

<style lang="stylus" scoped></style>
