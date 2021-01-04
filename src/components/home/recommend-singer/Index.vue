<template>
  <div class="recommend-singer">
    <h2 class="title">推荐歌手</h2>
    <ul class="singer-list">
      <singer-item
        v-for="item in singer"
        :key="item.id"
        :singer="item"
      ></singer-item>
    </ul>
  </div>
</template>

<script>
import SingerItem from 'components/common/singerItem/Index'
export default {
  name: '',
  // 组件
  components: {
    SingerItem
  },
  // 变量
  data() {
    return {
      singer: []
    }
  },
  // 方法
  methods: {
    // 获取热门歌手
    async getHotSinger() {
      let res = await this.$api.getHotSinger()
      this.singer = res.artists
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
    this.getHotSinger()
  }
}
</script>

<style lang="stylus" scoped>
.recommend-singer {
  margin-top: 40px;
  .title {
    margin: 0 0 15px 0;
  }
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 0px -15px 0;
  }
}
</style>
