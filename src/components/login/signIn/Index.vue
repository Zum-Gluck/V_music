<template>
  <div class="login-form">
    <el-form ref="ruleForm" :model="userInfo" :rules="rules">
      <div class="login-input">
        <el-form-item prop="mobile">
          <el-input
            class="login-text"
            type="text"
            placeholder="手机号/网易163邮箱"
            v-model="userInfo.mobile"
          ></el-input>
          <span class="login-focus"></span>
          <span class="login-symbol">
            <i class="iconfont nicephone2"></i>
          </span>
        </el-form-item>
      </div>
      <div class="login-input">
        <el-form-item prop="password">
          <el-input
            class="login-text"
            type="password"
            placeholder="请输入密码"
            v-model="userInfo.password"
          ></el-input>
          <span class="login-focus"></span>
          <span class="login-symbol">
            <i class="iconfont nicemima"></i>
          </span>
        </el-form-item>
      </div>
      <!-- 登录按钮 -->
      <div class="login-footer">
        <div class="login-btn-wrap">
          <el-button
            class="login-btn"
            type="primary"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </div>
      </div>
      <div class="forget-password">
        <div>
          <router-link :to="{ name: 'validate' }" replace>
            验证码登录
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'signUp' }">
            注册
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'forget' }"> 忘记密码 </router-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  // 组件
  components: {},
  // 变量
  data() {
    let validateAccount = (rule, value, callback) => {
      let regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
      let regMobile = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
      this.EmailFlag = regEmail.test(value)
      this.MobileFlag = regMobile.test(value)
      if (this.EmailFlag || this.MobileFlag) {
        // 判断登录方式
        if (this.EmailFlag) {
          this.loginType = 'email'
          callback()
        } else {
          this.loginType = 'mobile'
          callback()
        }
      } else {
        callback(new Error('请输入邮箱或者手机号'))
      }
    }
    return {
      userInfo: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [{ validator: validateAccount, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最短6位哦！', trigger: 'blur' }
        ]
      },
      EmailFlag: false,
      MobileFlag: false,
      loginType: ''
    }
  },
  // 方法
  methods: {
    // 登录按钮
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          switch (this.loginType) {
            case 'mobile':
              this._mobileLogin()
              break
            case 'email':
              this._emailLogin()
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 手机登录
    async _mobileLogin() {
      try {
        let timestamp = new Date().valueOf()
        let { mobile: phone, password } = this.userInfo
        let res = await this.$api.login(phone, password, timestamp)
        if (res.code == 200) {
          console.log(res)
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.replace({
            name: 'profile'
          })
        }
      } catch (err) {
        let msg = ''
        if (err.message) {
          msg = err.message
        } else {
          msg = err.data.message
        }
        this.$message({
          type: 'error',
          message: msg
        })
      }
    },
    async _checkLoginStatus() {
      try {
        let res = await this.$api.getLoginStatus()
      } catch (err) {
        console.log(err)
      }
    },
    // 邮箱登录
    async _emailLogin() {
      try {
        let { mobile: email, password } = this.userInfo
        let res = await this.$api.loginEmail(email, password)
        console.log(res)
      } catch (err) {
        if (!err.message)
          return this.$message.error('邮箱不存在,可以使用验证码登录')
        this.$message.error(err.message)
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
  mounted() {}
}
</script>

<style lang="stylus">
@import '../common.styl';
</style>
