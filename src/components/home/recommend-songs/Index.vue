<template>
	<div class="recommend-songs">
		<h2 class="title">推荐歌单</h2>
		<SongSheet :sheetList="personalizeds"></SongSheet>
	</div>
</template>

<script>
import SongSheet from "components/common/songsheet/Index";
export default {
	// 组件
	components: {
		SongSheet,
	},
	// 变量
	data() {
		return {
			limit: 24,
			personalizeds: [],
		};
	},
	// 方法
	methods: {
		// 获取推荐歌单
		async getPersonalizeds() {
			try {
				let res = await this.$api.getPersonalizeds(this.limit);
				// console.log(res);
				this.personalizeds = res.result;
			} catch (err) {
				console.log(err);
			}
		},
	},
	// 计算属性
	computed: {},
	// 监控data中的数据变化
	watch: {},
	// 生命周期 - 创建完成(可以访问当前this实例)
	created() {},
	// 生命周期 - 挂载完成(可以访问dom元素)
	mounted() {
		this.getPersonalizeds();
	},
};
</script>

<style lang="stylus" scoped>
.recommend-songs{
   margin-top 40px;
   .title {
       margin :0 0 15px 0;
    }
}
</style>
