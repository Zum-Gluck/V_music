<template>
  <div class="load-more">
    <slot></slot>
  </div>
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
    // 获取滚动条的高度
    getScrollTop() {
      let scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      // console.log(scrollTop + '++++')
      return Math.round(scrollTop)
    },
    // 获取当前可视范围的高度
    getClientHeight() {
      var clientHeight = 0

      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      }
      // console.log(clientHeight + '----')
      //相当于css中的100vh
      return clientHeight
    },
    // 读取文档完整高度
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
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
    var that = this
    window.onscroll = function() {
      if (
        that.getScrollTop() + that.getClientHeight() >=
        that.getScrollHeight() - 10
      ) {
        that.$emit('scroll-state', true)
      }
    }
  }
}
</script>

<style lang="stylus" scoped></style>
