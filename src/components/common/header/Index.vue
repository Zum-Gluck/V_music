<template>
	<div class="header shadow">
		<div class="container flex-row">
			<div class="logo">
				<router-link :to="{ name: 'home' }" tag="a"></router-link>
			</div>
			<ul class="nav flex-row">
				<li>
					<router-link :to="{ name: 'home' }" tag="a">发现音乐</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'rank' }" tag="a">排行榜</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'playlist' }" tag="a">歌单</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'singer' }" tag="a">歌手</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'video' }" tag="a">视频</router-link>
				</li>
				<li>
					<router-link :to="{ name: 'mv' }" tag="a">MV</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.header {
 width: 100%;
  height: 70px;
  transition: all 400ms ease-in-out;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  // logo 开始
   .logo {
    width: 146px;
    display: flex;
    align-items: center;
    margin-right: 30px;
    a {
      width: 100%;
      display: block;
      height: 70px;
      background-position: 0px center;
      background-repeat: no-repeat;
      background-size: 146px 26px;
      background-image: url(../../../assets/images/logo_black.png);
    }
    img {
      width: 130px;
    }
  }
  // logo结束

  // 导航栏开始
    .nav {
    flex: 1
    li {
      font-size: 14px;
      height: 100%;
      padding: 0 15px;
      a {
        position: relative;
        transition: all 0.4s;
        &.router-link-active {
          color: $color-theme;
            &::after {
            content: "";
            position: absolute;
            background: $color-theme;
            left: 0;
            right: 0;
            bottom: -12px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin: 0 auto;
            opacity: 1;
          }
        }
      }
    }
  }
  // 导航栏结束
}
</style>
