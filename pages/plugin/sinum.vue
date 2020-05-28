<template name="cu-sinum">
	<view class="bg-white">
	
			<view class="grid text-center " v-for="(it, index) in allarray4s5r" :key="index" >
				<view
					class=""
					style="display: flex;align-items: center;justify-content: center;    border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;"
					:style="
						'width:' + item.width + 'px; height:' + item.height + 'px; '+'background:url('+item.img+') no-repeat #cccccc 100%; background-size: cover; '
					"
					v-for="(item, ind) in it"
					:key="ind">
					<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==0 ">{{item.name}}</view>
					<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==item.row-1 ">{{item.name}}</view>
					
					<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==0 && ind!=item.cols-1">{{item.name}}</view>
					<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==0 &&  index!=0">{{item.name}}</view>
					<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==item.row-1 && ind!=0">{{item.name}}</view>
					<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==item.cols-1 && index!=item.cols-1 ">{{item.name}}</view>
			
			</view>
			</view>
			
			<view class="grid text-center "  v-for="(it, index) in allarray4s5r" :key="index" >
				<view
					class=" text-white"
					style="display: flex;align-items: center;justify-content: center;   border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;"
					:style="
						'width:' + item.width + 'px; height:' + item.height + 'px;background-color:' + item.bgcolor
					"
					v-for="(item, ind) in it"
					:key="ind">
					{{ item.name }}
					</view>
			</view>
				
	</view>
</template>

<script>
export default {
	name: "cu-sinum",
	data() {
		return {
			windowWidth: 400,
			sinwidthmodel: 45,
			isimg: true,
			empimg: '',
			curwidth: 300, //宽度
			curheight: 250, //长度
			sebla: 1,
			firstwidth: 0,
			firstheight: 0,
			allarray4s5r: [],
			bottom_img:"/static/demo/bottom.jpg",
			bottomright_img:"/static/demo/bottomright.jpg",
			center_img:"/static/demo/center.jpg",
			left_img:"/static/demo/left.jpg",
			leftbottom_img:"/static/demo/leftbottom.jpg",
			lefttop_img:"/static/demo/lefttop.jpg",
			right_img:"/static/demo/right.jpg",
			righttop_img:"/static/demo/righttop.jpg",
			top_img:"/static/demo/top.jpg",
			
			
		};
	},

	methods: {
		getfirst4s5r() {
			//四舍五入方案 计算第一块板的大小
			var wnum = Math.round(this.curwidth / this.sinwidthmodel);
			var modnum = this.curwidth % this.sinwidthmodel;
			var firstwidth = 0;
			var widthisliubai = false;
			var heightisliubai = false;
			var widthcaiban=false;
			if (modnum != 0) {
				if (modnum > this.sinwidthmodel / 2) {
					//裁板方案
					widthcaiban=true;
					
					firstwidth = Math.round(this.sinwidthmodel - (this.sinwidthmodel * wnum - this.curwidth) / 2);
				} else {
					//留白方案
					firstwidth =(this.curwidth - this.sinwidthmodel * wnum) / 2;
					widthisliubai = true;
					wnum = parseInt(wnum) + 2;
				}
			} else {
				//宽度刚刚好！
				firstwidth = this.sinwidthmodel;
			}

			var hnum = Math.round(this.curheight / this.sinwidthmodel);
			var modnum = this.curheight % this.sinwidthmodel;
			var firstheight = 0;
			var heightcaiban=false;
			if (modnum != 0) {
				if (modnum > this.sinwidthmodel / 2) {
					//裁板方案
					heightcaiban=true;
					firstheight = Math.round(this.sinwidthmodel - (this.sinwidthmodel * hnum - this.curheight) / 2);
				} else {
					//留白方案
					firstheight = (this.curheight - this.sinwidthmodel * hnum) / 2;
					heightisliubai = true;
					hnum = parseInt(hnum) + 2;
				}
			} else {
				//宽度刚刚好！
				firstheight = this.sinwidthmodel;
			}
			return { width: firstwidth, height: firstheight, heightisliubai: heightisliubai, widthisliubai: widthisliubai,widthcaiban:widthcaiban,heightcaiban:heightcaiban, row: hnum, cols: wnum };
		},

		getbilipx(val, cur) {
			return Math.floor(this.windowWidth * (val / cur));
		},

		getarray(arr) {
			var firstwidth = arr.width;
			var firstheight = arr.height;
			var cols = arr.cols;
			var row = arr.row;
			var heightcaiban=arr.heightcaiban;
			var widthcaiban=arr.widthcaiban;
			var heightisliubai = arr.heightisliubai;
			var widthisliubai = arr.widthisliubai;
			console.log(arr);
			for (var p = 1; p <= row; p++) {
				//行
				var temparray4s5r = [];
				for (var i = 1; i <= cols; i++) {
					var j = [];
					j.heightisliubai=heightisliubai;
					j.widthisliubai=widthisliubai;
					j.cols=cols;
					j.row=row;
					j.bgcolor = '#cccccc';
					if (i == 1 || i == cols) {
						//第一列与最后一列
						j.img = '';
						if (widthisliubai == false && heightisliubai == true) {
							if ((p == 2 && i == 1) || (p == row - 1 && i == cols) || (p == 2 && i == cols) || (p == row - 1 && i == 1)) {
								if (p == 2 && i == 1) {
									j.img = this.lefttop_img;
								} else if (p == row - 1 && i == cols) {
									j.img = this.bottomright_img;
								} else if (p == 2 && i == cols) {
									j.img = this.righttop_img;
								} else if (p == row - 1 && i == 1) {
									j.img = this.leftbottom_img;
								}
								j.bgcolor = '#675ac6';
							}
						}

						if (p == 1 || p == row) {
							//第一列，第一行
							if (widthisliubai == false && heightisliubai == false) {
								j.bgcolor = '#675ac6';
								if (p == 1 && i == 1) {
									j.img = this.lefttop_img;
								} else if (p == 1 && i == cols) {
									j.img = this.righttop_img;
								} else if (p == row && i == 1) {
									j.img = this.leftbottom_img;
								} else if (p == row && i == cols) {
									j.img = this.bottomright_img;
								}
							} else {
								j.bgcolor = '#cccccc';
							}

							j.width = this.getbilipx(firstwidth, this.curwidth);
							j.height = this.getbilipx(firstheight, this.curwidth);
							j.name = firstheight;
						} else {
							j.width = this.getbilipx(firstwidth, this.curwidth);
							j.height = this.getbilipx(this.sinwidthmodel, this.curwidth);
							j.name = firstwidth;
							
							if (widthisliubai == false && heightisliubai == true) {
								if(p!=2 && p!=row-1){
									if(i==1){
										j.img = this.left_img;
									}else if(i==cols){
										j.img = this.right_img;
									}
								}
							}else if (widthisliubai == true && heightisliubai == false){
								// if(p!=2 && p!=row-1){
								// 	if(i==1){
								// 		j.img = left_img;
								// 	}else if(i==cols){
								// 		j.img = this.right_img;
								// 	}
								// }
							}else if (widthisliubai == true && heightisliubai == true) {
								
							}
							else{
								if(i==1){
									j.img = this.left_img;
								}else if(i==cols){
									j.img = this.right_img;
								}
							}
							
						}

						temparray4s5r.push(j);
					} else {
						//其它列其它行
						if (p == 1 || p == row) {
							//第一行最后一行
							j.width = this.getbilipx(this.sinwidthmodel, this.curwidth);
							j.height = this.getbilipx(firstheight, this.curwidth);
							j.name = firstheight;
							
							
							
							if (widthisliubai == false && heightisliubai == true) {
								
								
							}
							else if (widthisliubai == true && heightisliubai == true) {
								
							}else{
								if(p==1){
									j.img = this.top_img;
								}else if(p==row){
									j.img = this.bottom_img;
								}
							}
							
							
							
							
							
							if (widthisliubai && heightisliubai == false) {
								if ((p == 1 && i == 2) || (p == row && i == cols - 1) || (p == 1 && i == cols - 1) || (p == row && i == 2)) {
									
									if (p == 1 && i == 2) {
										j.img = this.lefttop_img;
									} else if (p == row && i == cols - 1) {
										j.img = this.bottomright_img;
									} else if (p == 1 && i == cols - 1){
										j.img = this.righttop_img;
									} else if (p == row && i == 2) {
										j.img = this.leftbottom_img;
									}
									
									j.bgcolor = '#675acd';
								}
							}
						} else {
							if (widthisliubai == true && heightisliubai == true) {
								j.img = this.center_img;	
								
								if ((p == 2 && i == 2) || (p == row - 1 && i == cols - 1) || (p == 2 && i == cols - 1) || (p == row - 1 && i == 2)) {
									
									if (p == 2 && i == 2) {
										j.img = this.lefttop_img;
									} else if (p == row - 1 && i == cols - 1) {
										j.img = this.bottomright_img;
									} else if (p == 2 && i == cols - 1){
										j.img = this.righttop_img;
									} else if (p == row - 1 && i == 2) {
										j.img = this.leftbottom_img;
									}
									j.bgcolor = '#675ac6';
								} else {
									
									if(p==2){
										j.img = this.top_img;
									}else if(p==row-1){
										j.img = this.bottom_img;
									}
									
									if(i==2){
										j.img = this.left_img;
									}else if(i==cols-1){
										j.img = this.right_img;
									}
									
									j.bgcolor = '#d1a741';
								}
								
								
							} else {
								if (widthisliubai == false && heightisliubai == true) {
									j.img = this.center_img;
									if(p==2){
										j.img = this.top_img;
									}else if(p==row-1){
										j.img = this.bottom_img;
									}
								}else if (widthisliubai && heightisliubai == false){
									j.img = this.center_img;
									if(i==2){
										j.img = this.left_img;
									}else if(i==cols-1){
										j.img = this.right_img;
									}
								}else{
									j.img = this.center_img;	
								}
								
								j.bgcolor = '#d1a741';
								
							}

							j.width = this.getbilipx(this.sinwidthmodel, this.curwidth);
							j.height = this.getbilipx(this.sinwidthmodel, this.curwidth);
							j.name = this.sinwidthmodel;
						}

						temparray4s5r.push(j);
					}
				}

				this.allarray4s5r.push(temparray4s5r);
			}

			// console.log(this.allarray4s5r);
		},

		gets() {
			try {
				const res = uni.getSystemInfoSync();
				this.windowWidth = res.windowWidth;
				this.getarray(this.getfirst4s5r());

				//console.log(this.getfirstlibaiban());
			} catch (e) {
				// error
			}
		}
	},
	onReady() {
		
	},
	onLoad() {
		this.gets();
	}
};
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
