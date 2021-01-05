<template>
  <div class="load-more"></div>
</template>

<script>
export default {
  name: '',
  // 组件
  components: {},
  // 变量
  data() {
    return {}
  },
  // 方法
  methods: {
    getScrollTop() {
      let scrollTop = 0
      console.log(document.documentElement)
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
        console.log(scrollTop)
      }
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
    this.getScrollTop()
  }
}
</script>

<style lang="stylus" scoped></style>
