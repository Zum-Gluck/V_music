<template>
	<div class="banner">
		<swiper class="swiper" :options="swiperOption" v-if="bannersInit">
			<swiper-slide v-for="item of banners" :key="item.imageUrl">
				<img :src="item.imageUrl" :alt="item.typeTitle" />
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
export default {
	name: "Banner",
	data() {
		return {
			banners: [],
			swiperOption: {
				slidesPerView: 3, // 展示多少张图片
				spaceBetween: 30, // 图片间隔多少像素
				slidesPerGroup: 3, // 一次滑动多少张图片
				loop: true, // 开启无缝滚动
				loopFillGroupWithBlank: true,
				centeredSlides: true,
				paginationClickable: true, //分页器能点击
				grabCursor: true, //鼠标悬变成手
				pagination: ".swiper-pagination",
			},
		};
	},
	computed: {
		bannersInit() {
			// banners中没有数据返回false 不渲染节约性能
			return this.banners.length;
		},
	},
	methods: {
		async getBanner() {
			try {
				let res = await this.$api.getBanner();
				this.banners = res.banners;
				this.bannersBg = res.banners[0].imageeUrl;
			} catch (err) {
				console.log(err);
			}
		},
		carouselChange(e) {
			console.log(e);
			this.bannerBg = this.banners[e].imageeUrl;
		},
	},
	mounted() {
		this.getBanner();
	},
};
</script>

<style lang="stylus" scoped>
.banner >>> .swiper-pagination {
  width: 100%;
  bottom: -20px;
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #a3a3ac;
    opacity: 0.8;
    border-radius: 50%;
    margin: 0 5px;
    &.swiper-pagination-bullet-active {
      opacity: 1;
      width: 15px;
      border-radius: 4px;
      background: $color-theme;
    }
  }
}
.banner {
  position: relative;
  img {
    border-radius: 3px;
  }
}
</style>
