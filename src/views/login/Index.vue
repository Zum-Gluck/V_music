<template>
  <kinesis-container>
    <div class="login-wrap">
      <kinesis-element :parallaxStrength="4" type="depth">
        <div class="login-box">
          <img src="../../assets/images/logo-a.png" class="nice-logo" />
          <p>NICEMUSIC</p>
          <router-view></router-view>
        </div>
      </kinesis-element>
    </div>
  </kinesis-container>
</template>


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
