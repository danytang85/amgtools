<template>
	<view class="padding-top">
		
		<cu-tools v-if="PageCur=='tools'"></cu-tools>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="tools">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/tools' + [PageCur == 'tools'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='tools'?'text-green':'text-gray'">爱摩戈工具箱</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'tools'
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		}
	}
</script>

<style>

</style>
