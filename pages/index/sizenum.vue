<template>
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">爱摩戈算板神器</block>
		</cu-custom>
		<scroll-view scroll-x class="bg-white nav text-center " :style="[{top:CustomBar + 'px'}]">
			<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{tabNav[index]}}
			</view>
		</scroll-view>

		<block v-if="TabCur==0"><!--算450板-->
			<form>
				<view class="cu-form-group margin-top">
					<view class="title">长度</view>
					<input type="digit" maxlength="4" inputmode="decimal" step="0.01" placeholder="请输入房间长度,单位米" name="heightsin"  @input="Height_Inputgetdata"  > </input>
				</view>
				<view class="cu-form-group">
					<view class="title">宽度</view>
					<input  type="digit" maxlength="4" inputmode="decimal" step="0.01"  placeholder="请输入房间宽度,单位米" name="widthsin"  @input="Width_Inputgetdata"  ></input>
				</view>
				<view class="cu-form-group">
					<view class="title">灯位</view>
					<input  type="number" inputmode="decimal" maxlength="2" step="1"  placeholder="请输入灯板数量,单位台" name="nosin" @input="Dengno_Inputgetdata"></input>
				</view>
				
				<view class="cu-form-group">
					<view class="title">放板</view>
					<switch @change="Imgswitch" :class="isimg?'checked':''" :checked="isimg?true:false"></switch>
				</view>
				<view class="cu-form-group">
					<view class="title">板尺寸</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'450'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">选板</view>
					<text class='cuIcon-right text-orange'></text>
				</view>
			</form>
			<view v-if="isshow" >
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="FATabCur == 'sswrtab' ? 'text-orange cur' : ''" @tap="FatabSelect" data-id="sswrtab">四舍五入方案</view>
					<view class="cu-item flex-sub" :class="FATabCur == 'bbbtab' ? 'text-orange cur' : ''" @tap="FatabSelect" data-id="bbbtab"   >补白板方案</view>
				</view>
			</scroll-view>
			<block v-if="FATabCur == 'sswrtab'"><!-- 450板四舍五入方案 -->
				<view class="padding-top bg-white ">
				
					<view class="grid text-center " v-if="isimg" v-for="(it, index) in allarray4s5r" :key="index" >
						<view
							v-for="(item, index1) in it"
							:key="index1"
							class=""
							style="display: flex;align-items: center;justify-content: center;    border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;"
							:style="'width:' + item.pwidth + 'px; height:' +item.pheight + 'px; '
							">
							
							<view style="position: absolute;z-index: 100; " v-if="item.showname==true">{{item.name}}</view>
							<img style="width: 100%; height:100%" :src="item.img" v-if="item.img!=''"/>
							<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==0 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==item.row-1 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==0 && ind!=item.cols-1">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==0 &&  index!=0">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==item.row-1 && ind!=0">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==item.cols-1 && index!=item.cols-1 ">{{item.name}}</view>
						</view>
					</view>
					
					<view class="grid text-center " v-if="isimg==false"   v-for="(it, index) in allarray4s5r" :key="index" >
						<view
							v-for="(item, index1) in it"
							:key="index1"
							class=" text-white"
							style="display: flex;align-items: center;justify-content: center;   border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;"
							:style="
								'width:' + item.pwidth + 'px; height:' + item.pheight + 'px; background-color:' + item.bgcolor
							"
							
							>
							{{ item.name }}
							</view>
					</view>
					
					<view class="padding" >
					<view class=" flex justify-between ">
						<view class="text-lg">中花</view>
						<view class=" text-lg ">{{configdata450.zhonghua}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">边花</view>
						<view class=" text-lg ">{{configdata450.bianhua}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">角花</view>
						<view class=" text-lg ">{{configdata450.jiaohua}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">长梁</view>
						<view class=" text-lg ">{{configdata450.changliang}}米</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">宽梁</view>
						<view class=" text-lg ">{{configdata450.lianghuang}}米</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">长最外围加板长度</view>
						<view class=" text-lg ">{{configdata450.jiabancd}}米</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">宽最外围加板长度</view>
						<view class=" text-lg ">{{configdata450.jiabankd}}米</view>
					</view>
					
					<view class=" flex justify-between ">
						<view class="text-lg">建议加板片数</view>
						<view class=" text-lg ">{{configdata450.jiabanshuliang}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">边角</view>
						<view class=" text-lg ">{{configdata450.bianjiao}}条</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">面积</view>
						<view class=" text-lg ">{{configdata450.mainji}}平方米</view>
					</view>
					</view>
				 </view>
			</block>
			
			<block v-if="FATabCur == 'bbbtab'">
				<view class="padding-top bg-white ">
				
					<view class="grid text-center " v-if="isimg" v-for="(it, index) in allarrayliubaiban" :key="index" >
						<view
							class=""
							style="display: flex;align-items: center;justify-content: center;    border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;"
							:style="
								'width:' + item.pwidth + 'px; height:' + item.pheight + 'px; '
							"
							v-for="(item, ind) in it"
							:key="ind">
							<img style="width: 100%; height:100%" :src="item.img" v-if="item.img!=''"/>
							<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==0 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==item.row-1 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==0 && ind!=item.cols-1">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==0 &&  index!=0">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==item.row-1 && ind!=0">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==item.cols-1 && index!=item.cols-1 ">{{item.name}}</view>
						</view>
					</view>
					
					<view class="grid text-center " v-if="isimg==false"   v-for="(it, index) in allarray4s5r" :key="index" >
						<view
							class=" text-white"
							style="display: flex;align-items: center;justify-content: center;   border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;"
							:style="
								'width:' + item.pwidth + 'px; height:' + item.pheight + 'px; background-color:' + item.bgcolor
							"
							v-for="(item, ind) in it"
							:key="ind">
							{{ item.name }}
							</view>
					</view>
					
					<view class="padding" >
					<view class=" flex justify-between ">
						<view class="text-lg">中花</view>
						<view class=" text-lg ">{{configdata450liubaiban.zhonghua}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">边花</view>
						<view class=" text-lg ">{{configdata450liubaiban.bianhua}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">角花</view>
						<view class=" text-lg ">{{configdata450liubaiban.jiaohua}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">长梁</view>
						<view class=" text-lg ">{{configdata450liubaiban.changliang}}米</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">宽梁</view>
						<view class=" text-lg ">{{configdata450liubaiban.lianghuang}}米</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">长最外围加板长度</view>
						<view class=" text-lg ">{{configdata450liubaiban.jiabancd}}米</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">宽最外围加板长度</view>
						<view class=" text-lg ">{{configdata450liubaiban.jiabankd}}米</view>
					</view>
					
					<view class=" flex justify-between ">
						<view class="text-lg">建议加板片数</view>
						<view class=" text-lg ">{{configdata450.jiabanshuliang}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">边角</view>
						<view class=" text-lg ">{{configdata450.bianjiao}}条</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">面积</view>
						<view class=" text-lg ">{{configdata450.mainji}}平方米</view>
					</view>
					</view>
				 </view>
				
			</block>
			</view>
		</block><!--//算450板-->
		
		
		<block v-if="TabCur==1">
			
		</block>
		<block v-if="TabCur==2">
			
		</block>
		
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				TabCur: 0,
				index: 1,
				FATabCur: "sswrtab",
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'],
				picker: ['300', '450'],
				tabNav: ['算板', '算平面板'],
				isimg: true,
				windowWidth: 400,
				sinwidthmodel: 45,
				empimg: '',
				curwidth: 0, //宽度
				curheight: 0, //长度
				curmin:140,
				dengNo:0,
				isshow:false,
				sebla: 1,
				firstwidth: 0,
				firstheight: 0,
				allarray4s5r: [],
				allarrayliubaiban:[],
				bottom_img:"/static/demo/bottom.jpg",
				bottomright_img:"/static/demo/bottomright.jpg",
				center_img:"/static/demo/center.jpg",
				left_img:"/static/demo/left.jpg",
				leftbottom_img:"/static/demo/leftbottom.jpg",
				lefttop_img:"/static/demo/lefttop.jpg",
				right_img:"/static/demo/right.jpg",
				righttop_img:"/static/demo/righttop.jpg",
				top_img:"/static/demo/top.jpg",
				configdata450: {
					zhonghua:0,
					bianhua:0,
					jiaohua:0,
					changliang:0,
					lianghuang:0,
					jiabancd:0,
					jiabankd:0,
					jiabanshuliang:0,
					bianjiao:0,
					mainji:0,
				},
				configdata450liubaiban: {
					zhonghua:0,
					bianhua:0,
					jiaohua:0,
					changliang:0,
					lianghuang:0,
					jiabancd:0,
					jiabankd:0,
					jiabanshuliang:0,
					bianjiao:0,
					mainji:0,
				},
				
			};
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tapcon(obj){
				console.log(obj);
			},
			PickerChange(e) {
				console.log(e);
				this.index = e.detail.value
				this.sinwidthmodel=this.picker[this.index]/10;
				this.allarray4s5r=[];
				this.gets();
			},
			FatabSelect(e) {
				
				
				this.FATabCur = e.currentTarget.dataset.id;
			},
			
			Width_Inputgetdata(e){
				
				this.curwidth=e.detail.value*100;
				this.allarray4s5r=[];
				this.gets();
			},
			Height_Inputgetdata(e){
				this.curheight=e.detail.value*100;
				this.allarray4s5r=[];
				this.gets();
				console.log(e);
			},
			Dengno_Inputgetdata(e){
				this.dengNo=e.detail.value;
				this.allarray4s5r=[];
				this.gets();
				console.log(e);
			},
			Imgswitch(e) {
				this.isimg = e.detail.value
			},
			
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
				//计算材料
				//中花
				var thnum;
				var twnum;
				var thbianc;
				var twbianc;
				if(heightisliubai==true){
					 thnum=hnum-2-2;
				}else{
					thnum=hnum-2;
				}
				if(widthisliubai==true){
					 twnum=wnum-2-2;
				}else{
					twnum=wnum-2;
				}
				
				this.configdata450.zhonghua=thnum*twnum-this.dengNo;
				this.configdata450.bianhua=(thnum+twnum)*2
				this.configdata450.jiaohua=4;
				if(heightcaiban){//如果高度裁板
					this.configdata450.changliang=(this.curheight-firstheight*2)/100;
				}else{
					this.configdata450.changliang=thnum*this.sinwidthmodel/100;
				}
				
				if(widthcaiban){//如果高度裁板
					this.configdata450.lianghuang=(this.curwidth-firstwidth*2)/100;
				}else{
					this.configdata450.lianghuang=twnum*this.sinwidthmodel/100;
				}
				
				if(heightcaiban){//如果高度裁板
					thbianc =this.curheight;
				}else{
					thbianc =(thnum+2)*this.sinwidthmodel;
				}
				
				if(widthcaiban){//如果宽度裁板
					twbianc =this.curwidth;
					
				}else{
					twbianc =(twnum+2)*this.sinwidthmodel;
				}
				this.configdata450.bianjiao=Math.ceil(((thbianc+twbianc)*2)/100/3);
				this.configdata450.mainji=(this.curheight/100)*(this.curwidth/100);
				
				return { width: firstwidth, height: firstheight, heightisliubai: heightisliubai, widthisliubai: widthisliubai,widthcaiban:widthcaiban,heightcaiban:heightcaiban, row: hnum, cols: wnum };
			},
			
			
			
			getfirstlibaiban(){ //留白板方案 计算第一块板的大小
					var wnum=Math.floor(this.curwidth/this.sinwidthmodel);
					var modnum=this.curwidth%this.sinwidthmodel;
					var firstwidth;
					var widthisliubai=false;
					var heightisliubai=false;
					if(modnum!=0){
						firstwidth=Math.round((this.curwidth-this.sinwidthmodel*wnum)/2);
						widthisliubai=true;
						wnum=wnum+2;
					}else{//宽度刚刚好！
						firstwidth=this.sinwidthmodel;
					}
					
					var hnum=Math.floor(this.curheight/this.sinwidthmodel);
					var modnum=this.curheight%this.sinwidthmodel;
					var firstheight;
					
					if(modnum!=0){
							firstheight=Math.round((this.curheight-this.sinwidthmodel*hnum)/2);
							heightisliubai=true;
							hnum=hnum+2;
					}else{//宽度刚刚好！
						firstheight=this.sinwidthmodel;
					}
					
					
					//计算材料
					//中花
					var thnum;
					var twnum;
					var thbianc;
					var twbianc;
					if(heightisliubai==true){
						 thnum=hnum-2-2;
					}else{
						thnum=hnum-2;
					}
					if(widthisliubai==true){
						 twnum=wnum-2-2;
					}else{
						twnum=wnum-2;
					}
					
					this.configdata450liubaiban.zhonghua=thnum*twnum-this.dengNo;
					this.configdata450liubaiban.bianhua=(thnum+twnum)*2
					this.configdata450liubaiban.jiaohua=4;
					
						this.configdata450liubaiban.changliang=thnum*this.sinwidthmodel/100;
					
						this.configdata450liubaiban.lianghuang=twnum*this.sinwidthmodel/100;
					
					
					
						thbianc =(thnum+2)*this.sinwidthmodel;
					
					
						twbianc =this.curwidth;
					
					this.configdata450liubaiban.bianjiao=Math.ceil(((thbianc+twbianc)*2)/100/3);
					this.configdata450liubaiban.mainji=(this.curheight/100)*(this.curwidth/100);
					
					
					
					return {width:firstwidth,height:firstheight,widthisliubai:widthisliubai,heightisliubai:heightisliubai,row:hnum,cols:wnum};
				
			},
			
			
			getbilipx(val, cur) {
				return Math.floor(this.windowWidth * (val / cur));
			},
			
			getarray(arr) {
				if(arr==false){
					return;
				}
				var allarray=[];
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
						var j = new Object();
						j.heightisliubai=heightisliubai;
						j.widthisliubai=widthisliubai;
						j.cols=cols;
						j.row=row;
						j.bgcolor = '#bbbbbb';
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
									j.bgcolor = '#bbbbbb';
								}
			
								j.pwidth = this.getbilipx(firstwidth, this.curwidth);
								j.pheight = this.getbilipx(firstheight, this.curwidth);
								j.name = firstheight;
							} else {
								j.pwidth = this.getbilipx(firstwidth, this.curwidth);
								j.pheight = this.getbilipx(this.sinwidthmodel, this.curwidth);
								j.name = firstwidth;
								
								if (widthisliubai == false && heightisliubai == true) {
									if(p!=2 && p!=row-1){
										if(i==1){
											j.img = this.left_img;
											j.showname=true;
										}else if(i==cols){
											j.img = this.right_img;
											j.showname=true;
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
										j.showname=true;
									}else if(i==cols){
										j.img = this.right_img;
										j.showname=true;
									}
								}
								
							}
			
							temparray4s5r.push(j);
						} else {
							//其它列其它行
							if (p == 1 || p == row) {
								//第一行最后一行
								j.pwidth = this.getbilipx(this.sinwidthmodel, this.curwidth);
								j.pheight = this.getbilipx(firstheight, this.curwidth);
								j.name = firstheight;
								
								
								
								if (widthisliubai == false && heightisliubai == true) {
									
									
								}
								else if (widthisliubai == true && heightisliubai == true) {
									
								}else{
									if(p==1){
										j.img = this.top_img;
										j.showname=true;
									}else if(p==row){
										j.img = this.bottom_img;
										j.showname=true;
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
											j.showname=true;
										}else if(p==row-1){
											j.img = this.bottom_img;
											j.showname=true;
										}
										
										if(i==2){
											j.img = this.left_img;
											j.showname=true;
										}else if(i==cols-1){
											j.img = this.right_img;
											j.showname=true;
										}
										
										j.bgcolor = '#d1a741';
									}
									
									
								} else {
									if (widthisliubai == false && heightisliubai == true) {
										j.img = this.center_img;
										if(p==2){
											j.img = this.top_img;
											j.showname=true;
										}else if(p==row-1){
											j.img = this.bottom_img;
											j.showname=true;
										}
									}else if (widthisliubai && heightisliubai == false){
										j.img = this.center_img;
										if(i==2){
											j.img = this.left_img;
											j.showname=true;
										}else if(i==cols-1){
											j.img = this.right_img;
											j.showname=true;
										}
									}else{
										j.img = this.center_img;	
									}
									
									j.bgcolor = '#d1a741';
									
								}
			
								j.pwidth = this.getbilipx(this.sinwidthmodel, this.curwidth);
								j.pheight = this.getbilipx(this.sinwidthmodel, this.curwidth);
								j.name = this.sinwidthmodel;
							}
			
							temparray4s5r.push(j);
						}
					}
					this.isshow=true;
					allarray.push(temparray4s5r);
				}
				return allarray;
				 // console.log(this.allarray4s5r);
			},
			
			gets() {
				
				if(this.curwidth<this.curmin || this.curheight<this.curmin){
					this.isshow=false;
					return false;
				}
				try {
					
					const res = uni.getSystemInfoSync();
					this.windowWidth = res.windowWidth;
					this.allarray4s5r=this.getarray(this.getfirst4s5r());
					console.log(this.allarray4s5r)
					this.allarrayliubaiban=this.getarray(this.getfirstlibaiban());
				} catch (e) {
				}
			},
			
			// getsliubaiban(){
			// 	try {
			// 	    const res = uni.getSystemInfoSync();
			// 		this.windowWidth=res.windowWidth;
					
			// 		this.allarrayliubaiban=this.getarray(this.getfirstlibaiban());
			// 		//console.log(this.getfirstlibaiban());
			// 	} catch (e) {
			// 	    // error
			// 	}	
			// },
		},
		onLoad() {
			//this.gets();
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
</style>
