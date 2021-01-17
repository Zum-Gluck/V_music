<template>
  <div>
    <back-login></back-login>
    <div class="login-form">
      <el-form ref="ruleForm" :rules="rules" :model="userInfo">
        <div class="login-input">
          <el-form-item prop="phone">
            <el-input
              class="login-text"
              type="text"
              placeholder="输入你的手机号"
              v-model="userInfo.phone"
            ></el-input>
            <span class="login-focus"></span>
            <span class="login-symbol">
              <i class="iconfont nicephone2"></i>
            </span>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="login-text"
              type="password"
              placeholder="设置密码"
              v-model="userInfo.password"
            ></el-input>
            <span class="login-focus"></span>
            <span class="login-symbol">
              <i class="iconfont nicemima"></i>
            </span>
          </el-form-item>
        </div>
        <div class="login-footer">
          <div class="login-btn-wrap">
            <el-button
              class="login-btn"
              type="primary"
              @click="submitForm('ruleForm')"
            >
              下一步
            </el-button>
          </div>
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
    let validateMobile = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入手机号'))
      }
      let reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
      if (!reg.test(value)) {
        callback(new Error('手机号格式不正确'))
      }
      callback()
    }
    return {
      userInfo: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [{ validator: validateMobile, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, message: '最短八位字符', trigger: 'blur' }
        ]
      }
    }
  },
  // 方法
  methods: {
    // 下一步
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.replace({
            name: 'wait',
            params: {
              userInfo: this.userInfo
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
<style lang="stylus">
@import '../common.styl';
</style>
