<template>
  <div class="container">
    <div class="title">云音乐特色榜</div>
    <song-sheet :sheetList="especiallyList"></song-sheet>
    <div class="title">云音乐媒体榜</div>
    <song-sheet :sheetList="mediaList"></song-sheet>
  </div>
</template>

<script>
import songSheet from 'components/common/songsheet/Index'
export default {
  name: '',
  // 组件
  components: {
    songSheet
  },
  // 变量
  data() {
    return {
      especiallyList: [], //特色榜
      mediaList: []
    }
  },
  // 方法
  methods: {
    // 跳转到详情页
    toDetail(id) {
      this.$router.push({
        name: 'palylistDetail',
        query: {
          id
        }
      })
    },
    // 获取排行榜数据
    async getToplist() {
      try {
        let res = await this.$api.getToplist()
        if (res.code == 200) {
          this.especiallyList = this._getEspeciallyList(res.list)
          this.mediaList = this._getMediaList(res.list)
          console.log(this.especiallyList)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 获取特色榜
    _getEspeciallyList(list) {
      return list.slice(0, 4)
    },
    // 获取媒体榜
    _getMediaList(list) {
      return list.slice(4)
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
    this.getToplist()
  }
}
</script>

<style lang="stylus" scoped>
.title
  padding-left 20px
  color #4a4a4a
  font-size 16px
  font-weight 700
  border-left 3px solid $color-theme
  margin-bottom 20px
</style>
