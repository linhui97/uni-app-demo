<template>
	<view class="content">
		横屏
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello22222'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="sass">
	.rpx{
		/*rpx 小程序中的单位 750prx = 屏幕宽度*/
		width: 750rpx;
		height: 100px;
		background-color: aqua;
	}
	.vw{
		/*vw h5单位 100vw = 屏幕的宽度，100vh = 屏幕的高度*/
		width: 50vw;
		height: 50vh;
		background-color: tan;
	}
</style>
