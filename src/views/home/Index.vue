<template>
	<div class="home-wrap container">
		<banner></banner>
    <recommend-songs></recommend-songs>
	</div>
</template>

<script>
import Banner from "components/home/banner/Index";
import RecommendSongs from "components/home/recommend-songs/Index";
export default {
	components: {
    Banner,
    RecommendSongs
	},
};
</script>

<style lang="stylus" scoped></style>
