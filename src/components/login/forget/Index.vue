<template>
  <div>
    <back-login></back-login>
    <h1>忘记密码</h1>
  </div>
</template>

<script>
import backLogin from '../../common/backLogin/Index'
import waitMinute from '../../common/waitMinute/Index'
export default {
  name: '',
  // 组件
  components: {
    backLogin,
    waitMinute
  },
  // 变量
  data() {
    return {}
  },
  // 方法
  methods: {},
  // 计算属性
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
  }
}
</script>

<style lang="stylus" scoped></style>
