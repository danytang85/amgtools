<template>
	<view class="padding-top">
		
		<cu-tools v-if="PageCur=='tools'"></cu-tools>
		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="tools">
				<view class='cuIcon-cu-image'>
					<image :src="'/static/tabbar/tools' + [PageCur == 'tools'?'_cur':''] + '.png'"></image>
				</view>
				<view :class="PageCur=='tools'?'text-green':'text-gray'">艾摩戈工具箱</view>
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
		},
		onShareAppMessage: function( options ){
		　　var that = this;
		　　var shareObj = {
		　　　　title: "艾摩戈",        // 默认是小程序的名称(可以写slogan等)
		　　　　path: '/pages/index/index',        // 默认是当前页面，必须是以‘/’开头的完整路径
		　　　　imageUrl: that.apiServer+"/img/amglogo.jpg",     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
		　　　　success: function(res){
		　　　　　　// 转发成功之后的回调
		　　　　　　if(res.errMsg == 'shareAppMessage:ok'){
		　　　　　　}
		　　　　},
		　　　　fail: function(){
		　　　　　　// 转发失败之后的回调
		　　　　　　if(res.errMsg == 'shareAppMessage:fail cancel'){
		　　　　　　　　// 用户取消转发
		　　　　　　}else if(res.errMsg == 'shareAppMessage:fail'){
		　　　　　　　　// 转发失败，其中 detail message 为详细失败信息
		　　　　　　}
		　　　　},
		　　　　complete: function(){
		　　　　　　// 转发结束之后的回调（转发成不成功都会执行）
		　　　　}
		　　};
		　　// 来自页面内的按钮的转发
		　　
		　　return shareObj;
		},
		
	}
</script>

<style>

</style>
