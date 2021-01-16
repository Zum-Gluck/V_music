<template>
  <div class="box">{{ time }}秒后重试</div>
</template>

<script>
export default {
  name: '',
  // 组件
  components: {},
  // 变量
  data() {
    return {
      time: 60
    }
  },
  // 方法
  methods: {
    start() {
      setInterval(() => {
        this.time--
      }, 1000)
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
    this.start()
  }
}
</script>

<style lang="stylus" scoped></style>
