<template>
  <kinesis-container>
    <div class="login-wrap">
      <kinesis-element :parallaxStrength="4" type="depth">
        <div class="login-box">
          <div class="qr-code" @click="toQrcode" v-show="isShow">
            <img src="../../assets/images/qrcode.svg" alt="" />
          </div>
          <img src="../../assets/images/logo-a.png" class="nice-logo" />
          <p>NICEMUSIC</p>
          <router-view></router-view>
        </div>
      </kinesis-element>
    </div>
  </kinesis-container>
</template>
<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    toQrcode() {
      this.$router.replace({
        name: 'qrcode'
      })
    }
  },
  watch: {
    $route(val) {
      if (
        this.$route.name == 'qrcode' ||
        this.$route.name == 'forget' ||
        this.$route.name == 'signUp' ||
        this.$route.name == 'wait'
      ) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    }
  },
  mounted() {
    if (
      this.$route.name == 'qrcode' ||
      this.$route.name == 'forget' ||
      this.$route.name == 'signUp' ||
      this.$route.name == 'wait'
    ) {
      this.isShow = false
    } else {
      this.isShow = true
    }
  }
}
</script>

<style lang="stylus">
  .login-wrap {
  width: 100%;
  min-height: 100vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background: #5dd5c8 url(../../assets/images/newbg1.png) center bottom no-repeat;
  .login-box {
    overflow: hidden;
    height: 486px;
    position: relative;
    width: 350px;
    max-width: 350px;
    margin: 4em auto;
    background: #FFF;
    background-image: url(../../assets/images/logbg.jpg);
    border-radius: 8px;
    box-shadow: 1px 2px 15px rgba(0,0,0,.3);
    background-repeat: no-repeat;
    background-position: bottom;
    text-align: center;
    -webkit-backface-visibility: hidden;
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
    transition-duration: 0.3s;
    z-index: 80;
    .switch {
      font-size: 13px;
      position: absolute;
      right: 0px;
      bottom: 5px;
      width: 100%;
      text-align: center;
      color: #0ef3da;
      cursor: pointer;
      b {
        color: #0ef3da;
        font-weight: 600;
      }
    }
    .nice-logo {
      width: 55px;
      margin: 40px 0 0px;
    }
    p {
      margin-bottom: 45px;
    }
  }
}
.qr-code {
  position absolute
  top 3px
  left 3px
  z-index 9
  width 50px
  height 50px
  cursor pointer
  &::after {
    content ''
    position absolute
    right 0
    bottom 0
    display block
    width 0
    height 0
    border 25px solid transparent
    border-right-color #fff
    border-bottom-color #fff
    box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
  }
  &::before {
    content '扫码登录更安全'
    position absolute
    right -100px
    top 10px
    display block
    width 90px
    height 20px
    color #fff
    font-size 11px
    line-height 20px
    background-color #989898
  }
}
@-webkit-keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}

@keyframes anim-shadow {
  to {
    box-shadow: 0px 0px 70px 25px;
    opacity: 0;
  }
}
</style>
