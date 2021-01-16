<template>
  <div class="back" @click="backClick">返回登录</div>
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
    backClick() {
      this.$router.back()
    }
  },
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {}
}
</script>

<style lang="stylus" scoped>
.back
  position absolute
  top 6px
  left 10px
  cursor pointer
</style>
