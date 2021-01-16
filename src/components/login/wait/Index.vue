<template>
  <div>
    <div class="login-form">
      <el-form ref="ruleForm">
        <div class="login-input">
          <div class="as">为了你的账号安全请输入验证码</div>
          <el-form-item prop="mobile">
            <el-input
              class="login-text"
              type="text"
              placeholder="输入验证码"
            ></el-input>
            <span class="login-focus"></span>
            <span class="login-symbol">
              <i class="iconfont nicephone2"></i>
            </span>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import backLogin from '../../common/backLogin/Index'
export default {
  name: '',
  // 组件
  components: {
    backLogin
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
  mounted() {}
}
</script>
<style lang="stylus">
@import '../common.styl';
.as {
  margin 30px 0
  cursor pointer
}
</style>
