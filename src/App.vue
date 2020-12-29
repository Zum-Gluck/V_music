<template>
	<div id="app">
		<nice-header></nice-header>
    <router-view /> 
	</div>
</template>

<script>
import NiceHeader from "./components/common/header/Index";
export default {
	name: "app",
	components: {
		NiceHeader,
	},
};
</script>
