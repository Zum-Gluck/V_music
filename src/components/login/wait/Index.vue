<template>
  <div>
    <div class="login-form">
      <el-form ref="ruleForm">
        <div class="login-input">
          <div class="as">为了你的账号安全请输入验证码</div>
          <el-form-item prop="validate" id="validate">
            <el-input
              class="login-text"
              type="text"
              placeholder="验证码"
              v-model="validataCode"
            ></el-input>
            <span class="login-focus"></span>
            <span class="login-symbol">
              <i class="iconfont el-icon-edit-outline"></i>
            </span>
            <el-button
              class="validate_btn"
              type="success"
              :disabled="flag"
              @click="sendValidate"
            >
              {{ getWaitTime }}</el-button
            >
          </el-form-item>
          <div class="login-footer">
            <div class="login-btn-wrap">
              <el-button
                class="login-btn"
                type="primary"
                @click="chekValidate(validataCode)"
              >
                {{ finishText }}
              </el-button>
            </div>
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
    return {
      waitTime: 60,
      flag: true,
      validataCode: '',
      finishText: '注册'
    }
  },
  // 方法
  methods: {
    // 初始化
    sendValidate() {
      this.GetValidate()
      this.waitTime = 60
      this.flag = true
      this.startTimer()
    },
    //开启定时器
    startTimer() {
      let timer = setInterval(() => {
        this.waitTime--
        if (this.waitTime <= 0) {
          clearInterval(timer)
          this.flag = false
        }
      }, 1000)
    },
    // 发送验证码
    async GetValidate() {
      if (!this.$route.params) return
      let { phone, password } = this.$route.params.userInfo
      try {
        let timestamp = new Date().valueOf()
        let res = await this.$api.getValidateCode(phone, timestamp)
        console.log(res)
        if (res.code == 200) {
          this.$message.success('获取验证码成功')
        }
      } catch (err) {
        if (!err.data) return this.$message.error('获取验验证码失败')
        this.$message.error(err.data.message)
        console.log(err)
      }
    },
    // 检查验证码是否正确
    async chekValidate(val) {
      if (val.trim() == '') {
        this.$message.error('请输入验证码')
      } else {
        let { phone, password } = this.$route.params.userInfo
        // 生成随机名字
        let randomNum = Math.random().toString()
        let randomName = 'fj' + randomNum.slice(2)
        randomName = randomName.slice(0, 8)
        let params = {
          captcha: val,
          phone: phone,
          password: password,
          nickname: randomName
        }
        try {
          let res = await this.$api.resiger(params)
          if (res.code == 200) {
            this.$message.success(this.finishText + '成功')
            this.$router.replace({
              name: 'home'
            })
          }
        } catch (err) {
          this.$message.error(err.data.msg)
        }
      }
    },
    // 检查用户是否存在
    async checkUserHava() {
      let { phone } = this.$route.params.userInfo
      let res = await this.$api.checkUserHava(phone)
      // 用户存在 给出提示信息
      if (res.code == 200 && res.exist == 1) {
        let _phone = phone.slice(7)
        this.finishText = '重置密码'
        this.$notify({
          title: '用户已存在',
          message:
            '你好尾号为' +
            _phone +
            '的用户已经存在了，输入验证码后,将会重置你的网易云音乐密码',
          type: 'warning',
          duration: 0
        })
      }
    }
  },
  // 计算属性
  computed: {
    getWaitTime() {
      return this.waitTime <= 0 ? '重新获取' : this.waitTime + 'S后获取'
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  // 生命周期 - 挂载完成(可以访问dom元素)
  mounted() {
    this.sendValidate()
    this.checkUserHava()
  }
}
</script>
<style lang="stylus">
@import '../common.styl';
.as {
  margin 30px 0
  cursor pointer
}
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
