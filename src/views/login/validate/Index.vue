<template>
  <div class="login-form">
    <el-form ref="ruleForm" :model="userInfo" :rules="rules">
      <div class="login-input">
        <el-form-item prop="mobile">
          <el-input
            class="login-text"
            type="text"
            placeholder="输入你的手机号"
            v-model="userInfo.mobile"
          ></el-input>
          <span class="login-focus"></span>
          <span class="login-symbol">
            <i class="iconfont nicephone2"></i>
          </span>
        </el-form-item>
      </div>
      <div class="login-input">
        <el-form-item prop="validate" id="validate">
          <el-input
            class="login-text"
            type="text"
            placeholder="验证码"
            v-model="userInfo.validate"
          ></el-input>
          <span class="login-focus"></span>
          <span class="login-symbol">
            <i class="iconfont el-icon-edit-outline"></i>
          </span>
          <el-button
            class="validate_btn"
            type="success"
            @click="changeWaitTime"
          >
            {{ GetwaitTime }}
          </el-button>
        </el-form-item>
      </div>
      <div class="login-footer">
        <div class="login-btn-wrap">
          <el-button class="login-btn" type="primary" @click="signInClick">
            登录
          </el-button>
        </div>
      </div>
      <div class="forget-password">
        <div>
          <router-link :to="{ name: 'signIn' }" replace>
            账号密码登录
          </router-link>
        </div>
        <div><a href="javascript:;">注册</a></div>
        <div><a href="#">忘记密码?</a></div>
      </div>
    </el-form>
  </div>
</template>

<script>
// mobile 验证规则
let validateMobile = (rule, value, callback) => {
  if (value == '') {
    callback(new Error('请输入手机号'))
  }
  let reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
  if (!reg.test(value)) {
    callback(new Error('手机号格式不正确'))
  }
}
export default {
  name: '',
  // 组件
  components: {},
  // 变量
  data() {
    return {
      userInfo: {
        mobile: '',
        validate: ''
      },
      rules: {
        mobile: [{ validator: validateMobile, trigger: 'blur' }],
        validate: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      waitTime: 60,
      timer: null,
      flag: true
    }
  },
  // 方法
  methods: {
    changeWaitTime() {
      let mobile = this.userInfo.mobile
      let reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
      let mobileValidate = reg.test(mobile)
      // 验证手机格式
      if (mobileValidate && this.flag) {
        this._normalizeTime()
        this.getValidateCode(mobile)
        this.flag = false
      }
    },
    // 处理等待时间
    _normalizeTime() {
      this.timer = setInterval(() => {
        this.waitTime--
        if (this.waitTime == 0) {
          this.waitTime = 60
          this.flag = true
          clearInterval(this.timer)
        }
      }, 1000)
    },
    //获取验证码
    async getValidateCode(phone) {
      try {
        let res = await this.$api.getValidateCode(phone)
        this.$message({
          type: 'success',
          message: '注意查收验证码预计30秒左右'
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.data.message
        })
      }
      // 失败的情况
    },
    // 登录
    signInClick() {
      this.checkValidateCode()
    },
    // 校验验证码是否正确
    async checkValidateCode() {
      try {
        let res = await this.$api.checkValidateCode({
          phone: this.userInfo.mobile,
          captcha: this.userInfo.validate
        })
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: '登录成功'
          })
          this.$router.replace({
            name: 'profile'
          })
        }
      } catch (err) {
        this.$message({
          type: 'error',
          message: '验证码过期或错误'
        })
      }
    }
  },
  // 计算属性
  computed: {
    GetwaitTime() {
      return this.waitTime == 60 ? '获取验证码' : this.waitTime + 'S后重试'
    }
  },
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
#validate {
  position relative
  width 130px !important
  .validate_btn {
    position absolute
    top 2px
    right -120px
    background-color #5DD5C8
    border 0
  }
}
</style>
