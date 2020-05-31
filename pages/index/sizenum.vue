<template>
	<view>
		<cu-custom bgImage="https://image.weilanwl.com/color2.0/plugin/wdh2236.jpg" :isBack="true"><block slot="backText">返回</block>
			<block slot="content">艾摩戈算板神器</block>
		</cu-custom>
		<block v-if="TabCur==0" ><!--算450板-->
			<view style="padding-bottom: 50px;">
			<form>
				<view class="cu-form-group ">
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
					<view class="title">铝板尺寸</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?picker[index]:'450'}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group"  @tap="navproductimg()">
					<view class="title">选板</view>
					<text class=' text-black'>{{defautlname}}</text>
					<text class='cuIcon-right text-orange'></text>
				</view>
			</form>
			<view v-if="isshow" >
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center" v-if="onlypingpuisshow==false"  >
					<view class="cu-item flex-sub" :class="FATabCur == 'sswrtab' ? 'text-orange cur' : ''" @tap="FatabSelect" data-id="sswrtab">居中方案</view>
					<view class="cu-item flex-sub" :class="FATabCur == 'bbbtab' ? 'text-orange cur' : ''" @tap="FatabSelect" data-id="bbbtab"   >补白板方案</view>
					<view class="cu-item flex-sub" :class="FATabCur == 'pptab' ? 'text-orange cur' : ''" @tap="FatabSelect" data-id="pptab"   >平铺方案</view>
				</view>
				<view class="flex text-center" v-if="onlypingpuisshow" >
					<view class="cu-item flex-sub" :class="FATabCur == 'pptab' ? 'text-orange cur' : ''" @tap="FatabSelect" data-id="pptab"   >平铺方案</view>
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
							<img style="width: 100%; height:100%;" :class="item.sclass" :src="item.img" v-if="item.img!=''"/>
							 <view v-if="item.heightisliubai==true && item.widthisliubai==false && index==0 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==item.row-1 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==0 && index1!=item.cols-1">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && index1==0 &&  index!=0">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==item.row-1 && index1!=0">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && index1==item.cols-1 && index!=item.cols-1 ">{{item.name}}</view> 
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
			
			<block v-if="FATabCur == 'bbbtab'" >
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
							
							<img style="width: 100%; height:100%;" :class="item.sclass" :src="item.img" v-if="item.img!=''"/>
							<view style="position: absolute;z-index: 100; " v-if="item.showname==true">{{item.name}}</view>
							<!-- <view v-if="item.heightisliubai==true && item.widthisliubai==false && index==0 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==false && index==item.row-1 ">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==0 && ind!=item.cols-1">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==0 &&  index!=0">{{item.name}}</view>
							<view v-if="item.heightisliubai==true && item.widthisliubai==true && index==item.row-1 && ind!=0">{{item.name}}</view>
							<view v-if="item.widthisliubai==true && item.widthisliubai==true && ind==item.cols-1 && index!=item.cols-1 ">{{item.name}}</view> -->
						</view>
					</view>
					
					<view class="grid text-center " v-if="isimg==false"   v-for="(it, index) in allarrayliubaiban" :key="index" >
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
						<view class=" text-lg ">{{configdata450liubaiban.jiabanshuliang}}片</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">边角</view>
						<view class=" text-lg ">{{configdata450liubaiban.bianjiao}}条</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">面积</view>
						<view class=" text-lg ">{{configdata450liubaiban.mainji}}平方米</view>
					</view>
					</view>
				 </view>
				
			</block>
			<block v-if="FATabCur == 'pptab'">
				<view class="padding-top bg-white ">
				
					<view class="grid text-center " v-if="isimg" v-for="(it, index) in allarraypp" :key="index" >
						<view
							class=""
							style="display: flex;align-items: center;justify-content: center;    border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;"
							:style="
								'width:' + item.pwidth + 'px; height:' + item.pheight + 'px; '
							"
							v-for="(item, index1) in it"
							:key="index1">
							<view style="position: absolute;z-index: 100; " v-if="item.showname==true">{{item.name}}</view>
							<img style="width: 100%; height:100%;" :class="item.sclass" :src="item.img" v-if="item.img!=''"/>
						
						</view>
					</view>
					
					<view class="grid text-center " v-if="isimg==false"   v-for="(it, index) in allarraypp" :key="index" >
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
						<view class="text-lg">总共</view>
						<view class=" text-lg ">{{configdata450ppbb.allnum}}片</view>
					</view>
					
					<view class=" flex justify-between ">
						<view class="text-lg">长最外围加</view>
						<view class=" text-lg ">{{configdata450ppbb.jiabancd}}米</view>
					</view>
					<view class=" flex justify-between ">
						<view class="text-lg">宽最外围加</view>
						<view class=" text-lg ">{{configdata450ppbb.jiabankd}}米</view>
					</view>
					
					<view class=" flex justify-between ">
						<view class="text-lg">面积</view>
						<view class=" text-lg ">{{configdata450ppbb.mainji}}平方米</view>
					</view>
					</view>
				 </view>
				
			</block>
			</view>
			 </view>
		</block><!--//算450板-->
		
		
		
		<view class="text-center; bg-grey" @click="go()" style="position:fixed ;padding-top: 10px; bottom: 0px; height: 40px; text-align: center; width: 100%;">
			如有疑问，请联系艾摩戈(微信同号)
			</view>
	</view>
	
</template>

<script>
	import http from '@/components/utils/http.js';
	export default {
		data() {
			return {
				TabCur: 0,
				index: 1,
				FATabCur: "sswrtab",
				avatar:['https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg','https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'],
				picker: ['300', '450','600'],
				tabNav: ['算拼花板', '算平面板'],
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
				allarraypp:[],
				center_img:"/static/demo/center.jpg",
				left_img:"/static/demo/left.jpg",
				lefttop_img:"/static/demo/lefttop.jpg",
				top_img:"/static/demo/top.jpg",
				defautlname:"",
				onlypingpuisshow:false,
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
				configdata450ppbb: {
					allnum:0,
					jiabancd:0,
					jiabankd:0,
					mainji:0,
				},
				
			};
		},
		
		onShareAppMessage: function( options ){
		　　var that = this;
		　　var shareObj = {
		　　　　title: "艾摩戈算板神器",        // 默认是小程序的名称(可以写slogan等)
		　　　　path: '/pages/index/sizenum',        // 默认是当前页面，必须是以‘/’开头的完整路径
		　　　　imageUrl: that.apiServer+"/img/share.jpg",     //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
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
		
		methods: {
			
			go(){
			 	uni.makePhoneCall({
			 	
			 	// 手机号
			    phoneNumber: '15398420196', 
			
				// 成功回调
				success: (res) => {
					console.log('调用成功!')	
				},
			
				// 失败回调
				fail: (res) => {
					console.log('调用失败!')
				}
				
			  });
			},
		
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			
			
			sysFun(object){
				console.log(object);
					this.center_img=this.apiServer+object.centerimg;
					this.left_img=this.apiServer+object.leftimg;
					this.top_img=this.apiServer+object.topimg;
					this.lefttop_img=this.apiServer+object.topleftimg;
					this.defautlname=object.pname;
					this.allarray4s5r=[];
					this.gets();
			},
			
			navproductimg(){
				uni.navigateTo({
				    url: 'productimg?mid='+this.picker[this.index],
				});
			},
			tapcon(obj){
				console.log(obj);
			},
			PickerChange(e) {
				// console.log(e);
				this.index = e.detail.value
				this.sinwidthmodel=this.picker[this.index]/10;
				
				if(this.picker[this.index]==600){
					this.onlypingpuisshow=true;
					this.FATabCur="pptab";
				}else{
					this.onlypingpuisshow=false;
					this.FATabCur="sswrtab";
				}
				this.allarray4s5r=[];
				this.getprouductdefault(this.picker[this.index]);
				
				
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
				var wmodnum = this.curwidth % this.sinwidthmodel;
				var firstwidth = 0;
				var widthisliubai = false;
				var heightisliubai = false;
				var widthcaiban=false;
				if (wmodnum != 0) {
					if (wmodnum > this.sinwidthmodel / 2) {
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
				var hmodnum = this.curheight%this.sinwidthmodel;
				// console.log("hmodnum===="+hmodnum);
				var firstheight = 0;
				var heightcaiban=false;
				if (hmodnum != 0) {
					
					if (hmodnum > this.sinwidthmodel / 2) {
						//裁板方案
						heightcaiban=true;
						// firstwidth = Math.round(this.sinwidthmodel - (this.sinwidthmodel * wnum - this.curwidth) / 2);
						
						firstheight = Math.round(this.sinwidthmodel - (this.sinwidthmodel * hnum - this.curheight)/2);
						// console.log("wnum====="+wnum);
						// console.log("hnum====="+hnum);
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
				this.configdata450={
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
				};
				// console.log("heightisliubai="+heightisliubai);
				if(heightisliubai==true){
					 var tee=1;
					 thnum=hnum-2-2;
					 this.configdata450.jiabancd=firstheight/100
					 if(firstheight<=this.sinwidthmodel/2){//小于一半的按半片计算
						 tee=this.sinwidthmodel/2;
					 }
					 if(widthisliubai){
						 this.configdata450.jiabanshuliang=Math.ceil((tee*(wnum-2)*2/this.sinwidthmodel+0.5));
					 }else{
						 this.configdata450.jiabanshuliang=Math.ceil((tee*wnum*2/this.sinwidthmodel));
					 }
					
				}else{
					this.configdata450.jiabancd=0;
					thnum=hnum-2;
				}
				console.log("widthisliubai===="+widthisliubai);
				if(widthisliubai==true){
					 twnum=wnum-2-2;
					  this.configdata450.jiabankd=firstwidth/100
					  if(firstwidth<=this.sinwidthmodel/2){//小于一半的按半片计算
					  		tee=this.sinwidthmodel/2;
					  }
					  if(heightisliubai){
						   this.configdata450.jiabanshuliang=this.configdata450.jiabanshuliang+Math.ceil((tee*(hnum-2)*2/this.sinwidthmodel+0.5));
					  }else{
						   this.configdata450.jiabanshuliang=this.configdata450.jiabanshuliang+Math.ceil((tee*hnum*2/this.sinwidthmodel));
					  }
					 
				}else{
					 this.configdata450.jiabankd=0;
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
			
			
			getlibaiban_yibian(){ //补白板方案  留到一边
					var wnum=Math.floor(this.curwidth/this.sinwidthmodel);
					var wmodnum=this.curwidth%this.sinwidthmodel;
					
					var widthisliubai=false;
					var heightisliubai=false;
					if(wmodnum!=0){
						widthisliubai=true;
						wnum=wnum+1;
					}
					
					var hnum=Math.floor(this.curheight/this.sinwidthmodel);
					var hmodnum=this.curheight%this.sinwidthmodel;
					
					if(hmodnum!=0){
							heightisliubai=true;
							hnum=hnum+1;
					}
					
					//计算材料
					//中花
					var thnum;
					var twnum;
					var thbianc;
					var twbianc;
					this.configdata450liubaiban={
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
				};
					if(heightisliubai==true){
						 thnum=hnum-1-2;
						 this.configdata450liubaiban.jiabancd=hmodnum/100
						 var tee=1;
						 // console.log("hmodnum="+hmodnum);
						 if(hmodnum<=this.sinwidthmodel/2){//小于一半的按半片计算
						 	tee=this.sinwidthmodel/2;
						 }else{
							tee=this.sinwidthmodel;
						 }
						
						 if(widthisliubai){
							this.configdata450liubaiban.jiabanshuliang=Math.ceil((tee*(hnum-1)/this.sinwidthmodel)+0.5);
						 }else{
							this.configdata450liubaiban.jiabanshuliang=Math.ceil((tee*hnum/this.sinwidthmodel));
							  
						 }
						 
					}else{
						thnum=hnum-2;
					}
					if(widthisliubai==true){
						
						 twnum=wnum-1-2;
						 var tee=1;
						  this.configdata450liubaiban.jiabankd=wmodnum/100
						  if(wmodnum<=(this.sinwidthmodel/2)){//小于一半的按半片计算
						  	  tee=this.sinwidthmodel/2;
						  }else{
							  tee=this.sinwidthmodel;
						  }
						  // console.log("sinwidthmodel="+this.sinwidthmodel);
						  // console.log("tee="+tee);
						  //  console.log("wmodnum="+wmodnum);
						  if(heightisliubai){
						  this.configdata450liubaiban.jiabanshuliang=this.configdata450liubaiban.jiabanshuliang+Math.ceil((tee*(wnum-1)/this.sinwidthmodel)+0.5);
						   }else{
							this.configdata450liubaiban.jiabanshuliang=this.configdata450liubaiban.jiabanshuliang+Math.ceil((tee*wnum/this.sinwidthmodel));
							    
						   }
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
					
					return {widthisliubai:widthisliubai,heightisliubai:heightisliubai,row:hnum,cols:wnum,wmodnum:Math.round(wmodnum),hmodnum:Math.round(hmodnum)};
				
			},
			
			
			getfirstlibaiban(){ //留白板方案  居中计算第一块板的大小
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
					this.configdata450liubaiban={
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
				}
					if(heightisliubai==true){
						 thnum=hnum-2-2;
						 this.configdata450liubaiban.jiabancd=firstheight/100
						 var tee=1;
						 
						 if(firstheight<=this.sinwidthmodel/2){//小于一半的按半片计算
						 		tee=this.sinwidthmodel/2;
						 }
						 
						 if(widthisliubai){
							this.configdata450liubaiban.jiabanshuliang=Math.ceil((tee*(hnum-2)/this.sinwidthmodel*2)+0.5);
							 
						 }else{
							this.configdata450liubaiban.jiabanshuliang=Math.ceil((tee*hnum/this.sinwidthmodel*2));
							  
						 }
						 // console.log("firstheight="+hnum);
						 // console.log(this.configdata450liubaiban.jiabanshuliang);
					}else{
						thnum=hnum-2;
					}
					if(widthisliubai==true){
						 twnum=wnum-2-2;
						 var tee=1;
						  this.configdata450liubaiban.jiabankd=firstwidth/100
						  if(firstwidth<=this.sinwidthmodel/2){//小于一半的按半片计算
						  		 tee=this.sinwidthmodel/2;
						  }
						  if(heightisliubai){
						  this.configdata450liubaiban.jiabanshuliang=this.configdata450liubaiban.jiabanshuliang+Math.ceil((tee*(wnum-2)/this.sinwidthmodel*2)+0.5);
						   }else{
							this.configdata450liubaiban.jiabanshuliang=this.configdata450liubaiban.jiabanshuliang+Math.ceil((tee*wnum/this.sinwidthmodel*2));
							    
						   }
						   
						   // console.log(this.configdata450liubaiban.jiabanshuliang);
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
			
			
			getfirstpingpu(){ //平铺方案 
					var wnum=Math.floor(this.curwidth/this.sinwidthmodel);
					var wmodnum=this.curwidth%this.sinwidthmodel;
					
					var widthisliubai=false;
					var heightisliubai=false;
					if(wmodnum!=0){
						this.configdata450ppbb.jiabankd=Math.round(wmodnum)/100
						widthisliubai=true;
						wnum=wnum+1;
					}
					
					var hnum=Math.floor(this.curheight/this.sinwidthmodel);
					var hmodnum=this.curheight%this.sinwidthmodel;
					
					if(hmodnum!=0){
							this.configdata450ppbb.jiabancd=Math.round(hmodnum)/100
							heightisliubai=true;
							hnum=hnum+1;
					}
					
					
					//计算材料
					//中花
					var jiaban=0
					if(widthisliubai){
						var w=wnum-1;
						var tee=1;
						if(wmodnum<=this.sinwidthmodel/2){//小于一半的按半片计算
								 tee=this.sinwidthmodel/2;
						}else{
								 tee=this.sinwidthmodel;
						}
						if(hmodnum==0){
						 jiaban=Math.ceil(tee*hnum/this.sinwidthmodel)
						}else{
						 jiaban=Math.ceil(tee*(hnum-1)/this.sinwidthmodel+0.5)	
						}
						
					}else{
						var w=wnum	
					}
					if(widthisliubai){
						var h=hnum-1;
						var tee=1;
						if(hmodnum<=this.sinwidthmodel/2){//小于一半的按半片计算
								 tee=this.sinwidthmodel/2;
						}else{
								 tee=this.sinwidthmodel;
						}
						if(wmodnum==0){
						 jiaban=jiaban+Math.ceil(tee*wnum/this.sinwidthmodel)
						}else{
						 jiaban=jiaban+Math.ceil(tee*(wnum-1)/this.sinwidthmodel+0.5)	
						}
						
					}else{
						var h=hnum
					}
					this.configdata450ppbb.allnum=h*w+jiaban-this.dengNo;
					
					this.configdata450ppbb.mainji=(this.curheight/100)*(this.curwidth/100);
					
					return {widthisliubai:widthisliubai,heightisliubai:heightisliubai,wmodnum:Math.round(wmodnum),hmodnum:Math.round(hmodnum),row:hnum,cols:wnum};
				
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
				// console.log(arr);
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
										j.sclass="";
									} else if (p == row - 1 && i == cols) {
										j.img = this.lefttop_img;
										j.sclass="tr180";
									} else if (p == 2 && i == cols) {
										j.img = this.lefttop_img;
										j.sclass="mle";
									} else if (p == row - 1 && i == 1) {
										j.img = this.lefttop_img;
										j.sclass="mve";
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
										j.sclass="";
									} else if (p == 1 && i == cols) {
										j.img = this.lefttop_img;
										j.sclass="mle";
									} else if (p == row && i == 1) {
										j.img = this.lefttop_img;
										j.sclass="mve";
									} else if (p == row && i == cols) {
										j.img = this.lefttop_img;
										j.sclass="tr180";
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
											j.img = this.left_img;
											j.sclass="mle";
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
										j.img = this.left_img;
										j.sclass="mle";
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
										j.img = this.top_img;
										j.sclass="mve";
										j.showname=true;
									}
								}
								
								
								
								
								
								if (widthisliubai && heightisliubai == false) {
									if ((p == 1 && i == 2) || (p == row && i == cols - 1) || (p == 1 && i == cols - 1) || (p == row && i == 2)) {
										
										if (p == 1 && i == 2) {
											j.img = this.lefttop_img;
											j.sclass="";
										} else if (p == row && i == cols - 1) {
											j.img = this.lefttop_img;
											j.sclass="tr180";
										} else if (p == 1 && i == cols - 1){
											j.img = this.lefttop_img;
											j.sclass="mle";
										} else if (p == row && i == 2) {
											j.img = this.lefttop_img;
											j.sclass="mve";
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
											j.sclass="";
										} else if (p == row - 1 && i == cols - 1) {
											j.img = this.lefttop_img;
											j.sclass="tr180";
										} else if (p == 2 && i == cols - 1){
											j.img = this.lefttop_img;
											j.sclass="mle";
										} else if (p == row - 1 && i == 2) {
											j.img = this.lefttop_img;
											j.sclass="mve";
										}
										j.bgcolor = '#675ac6';
									} else {
										
										if(p==2){
											j.img = this.top_img;
											j.showname=true;
										}else if(p==row-1){
											j.img = this.top_img;
											j.sclass="mve";
											j.showname=true;
										}
										
										if(i==2){
											j.img = this.left_img;
											j.showname=true;
										}else if(i==cols-1){
											j.img = this.left_img;
											j.sclass="mle";
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
											j.img = this.top_img;
											j.sclass="mve";
											j.showname=true;
										}
									}else if (widthisliubai && heightisliubai == false){
										j.img = this.center_img;
										if(i==2){
											j.img = this.left_img;
											j.showname=true;
										}else if(i==cols-1){
											j.img = this.left_img;
											j.sclass="mle";
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
			
			getarray_yibian(arr) {
				if(arr==false){
					return;
				}
				var allarray=[];
				var wmodnum = arr.wmodnum;
				var hmodnum = arr.hmodnum;
				var cols = arr.cols;
				var row = arr.row;
				var heightisliubai = arr.heightisliubai;
				var widthisliubai = arr.widthisliubai;
				for (var p = 1; p <= row; p++) {
					//行
					var temparray4s5r = [];
					for (var i = 1; i <= cols; i++) {
							var j = new Object();
							j.heightisliubai=heightisliubai;
							j.widthisliubai=widthisliubai;
							j.cols=cols;
							j.row=row;
							j.name =this.sinwidthmodel;
							j.bgcolor = '#d1a741';
							j.img = this.center_img;
							j.pwidth = this.getbilipx(this.sinwidthmodel, this.curwidth);
							j.pheight = this.getbilipx(this.sinwidthmodel, this.curwidth);
							if(widthisliubai == true && heightisliubai == true){ //宽高都有留白情况
								if((i==1)||(p==1)||(i==cols-1)||(p==row-1)){//四个边
									if(i==1){//左边
										j.img = this.left_img;
										j.sclass="";
									}
									if(p==1){//上边
										j.img = this.top_img;
										j.sclass="";
									}
									if(i==cols-1){//右边
										j.img = this.left_img;
										j.sclass="mle";
									}
									if(p==row-1){//下边
										j.img = this.top_img;
										j.sclass="mve";
									}
								}
								
								//四个角
								if((p==1&&i==1) || (p==1&&i==cols-1) || (p==row-1 && i==1) || (p==row-1 && i==cols-1)){
									j.bgcolor = '#675ac6';
									if(p==1&&i==1){//左上角
										j.img = this.lefttop_img;
										j.sclass="";
									}
									if(p==1&&i==cols-1){ //右上角
										j.img = this.lefttop_img;
										j.sclass="mle";
									}
									if(p==row-1 && i==1){ //左下角
										j.img = this.lefttop_img;
										j.sclass="mve";
									}
									if(p==row-1 && i==cols-1){ //左下角
										j.img = this.lefttop_img;
										j.sclass="tr180";
									}
								}
								
								if((i==cols) || (p==row)){ //空白部分
									j.img = "";
									j.bgcolor = '#dddddd';
									j.showname=true;
								
									if(i==cols){
										j.pwidth=wmodnum;
										j.name =wmodnum ;
									}
									if(p==row){
										j.pheight=hmodnum;
										j.name =hmodnum ;
									}
									if(p==row && i==cols){
										j.pheight=hmodnum;
										j.pwidth=wmodnum;
										j.name ="";
									}
								}
							}else if(widthisliubai == false && heightisliubai == true){//高留白，宽不留白
								if((i==1)||(p==1)||(i==cols)||(p==row-1)){//四个边
									if(i==1){//左边
										j.img = this.left_img;
										j.sclass="";
									}
									if(p==1){//上边
										j.img = this.top_img;
										j.sclass="";
									}
									if(i==cols){//右边
										j.img = this.left_img;
										j.sclass="mle";
									}
									if(p==row-1){//下边
										j.img = this.top_img;
										j.sclass="mve";
									}
								}
								
								//四个角
								if((p==1&&i==1) || (p==1&&i==cols) || (p==row-1 && i==1) || (p==row-1 && i==cols)){
									j.bgcolor = '#675ac6';
									if(p==1&&i==1){//左上角
										j.img = this.lefttop_img;
										j.sclass="";
									}
									if(p==1&&i==cols){ //右上角
										j.img = this.lefttop_img;
										j.sclass="mle";
									}
									if(p==row-1 && i==1){ //左下角
										j.img = this.lefttop_img;
										j.sclass="mve";
									}
									if(p==row-1 && i==cols){ //左下角
										j.img = this.lefttop_img;
										j.sclass="tr180";
									}
								}
								
								if(p==row){ //空白部分
									j.img = "";
									j.bgcolor = '#dddddd';
									j.showname=true;
									
									if(p==row){
										j.pheight=hmodnum;
									}
									
								}		
							}else if(widthisliubai == true && heightisliubai == false){ //宽留白,高不留白
								if((i==1)||(p==1)||(i==cols-1)||(p==row)){//四个边
									if(i==1){//左边
										j.img = this.left_img;
										j.sclass="";
									}
									if(p==1){//上边
										j.img = this.top_img;
										j.sclass="";
									}
									if(i==cols-1){//右边
										j.img = this.left_img;
										j.sclass="mle";
									}
									if(p==row){//下边
										j.img = this.top_img;
										j.sclass="mve";
									}
								}
								
								//四个角
								if((p==1&&i==1) || (p==1&&i==cols-1) || (p==row && i==1) || (p==row && i==cols-1)){
									j.bgcolor = '#675ac6';
									if(p==1&&i==1){//左上角
										j.img = this.lefttop_img;
										j.sclass="";
									}
									if(p==1&&i==cols-1){ //右上角
										j.img = this.lefttop_img;
										j.sclass="mle";
									}
									if(p==row && i==1){ //左下角
										j.img = this.lefttop_img;
										j.sclass="mve";
									}
									if(p==row && i==cols-1){ //左下角
										j.img = this.lefttop_img;
										j.sclass="tr180";
									}
								}
								
								if((i==cols) || (p==row)){ //空白部分
									j.img = "";
									j.bgcolor = '#dddddd';
									j.showname=true;
									if(i==cols){
										j.pwidth=wmodnum;
									}
									
								}
							}else if(widthisliubai == false && heightisliubai == false){ //宽留白,高不留白
								if((i==1)||(p==1)||(i==cols)||(p==row)){//四个边
									if(i==1){//左边
										j.img = this.left_img;
										j.sclass="";
									}
									if(p==1){//上边
										j.img = this.top_img;
										j.sclass="";
									}
									if(i==cols){//右边
										j.img = this.left_img;
										j.sclass="mle";
									}
									if(p==row){//下边
										j.img = this.top_img;
										j.sclass="mve";
									}
								}
								//四个角
								if((p==1&&i==1) || (p==1&&i==cols) || (p==row && i==1) || (p==row && i==cols-1)){
									j.bgcolor = '#675ac6';
									if(p==1&&i==1){//左上角
										j.img = this.lefttop_img;
										j.sclass="";
									}
									if(p==1&&i==cols){ //右上角
										j.img = this.lefttop_img;
										j.sclass="mle";
									}
									if(p==row && i==1){ //左下角
										j.img = this.lefttop_img;
										j.sclass="mve";
									}
									if(p==row && i==cols){ //右下角
										j.img = this.lefttop_img;
										j.sclass="tr180";
									}
								}
							}
							
							temparray4s5r.push(j);
					}
					this.isshow=true;
					allarray.push(temparray4s5r);
				}
				
				return allarray;
			},
			
			
			getarrayppbb(arr) {
				if(arr==false){
					return;
				}
				var allarray=[];
				var cols = arr.cols;
				var row = arr.row;
				var heightisliubai = arr.heightisliubai;
				var widthisliubai = arr.widthisliubai;
				
				var hmodnum = arr.hmodnum;
				var wmodnum = arr.wmodnum;
				// console.log(arr);
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
						j.pheight=this.getbilipx(this.sinwidthmodel, this.curwidth);
						j.pwidth=this.getbilipx(this.sinwidthmodel, this.curwidth);
						j.name = this.sinwidthmodel;
						j.img=this.center_img;
						if (i == cols) {
							if(widthisliubai){
								j.name = wmodnum;
								j.showname=true;
								j.pwidth=this.getbilipx(wmodnum, this.curwidth);
							}
						}
						if(p==row){
							if(heightisliubai){
								j.showname=true;
								j.name = hmodnum;
								j.pheight=this.getbilipx(hmodnum, this.curwidth);
							}
						}
			
							temparray4s5r.push(j);
						}
					 allarray.push(temparray4s5r);
					}
					
					this.isshow=true;
					
				
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
					console.log(this.getlibaiban_yibian());
					this.allarrayliubaiban=this.getarray_yibian(this.getlibaiban_yibian());
					
					this.allarraypp=this.getarrayppbb(this.getfirstpingpu());
				} catch (e) {
				}
			},
			
			
			getprouductdefault(mid){
				
				let opts = {
						url: '/index/product/getprouductdefault',
						method: 'post'
					};
					
					let param = {mid:mid};
					http.httpRequest(opts,param).then(
						res => {
							//打印请求返回的数据
							if (res.data['code'] == 0) {
								this.center_img=this.apiServer+res.data["pimg"].centerimg;
								this.left_img=this.apiServer+res.data["pimg"].leftimg;
								this.top_img=this.apiServer+res.data["pimg"].topimg;
								this.lefttop_img=this.apiServer+res.data["pimg"].topleftimg;
								this.defautlname=res.data["pimg"].pname;
								this.gets();
							} else {
								uni.showToast({ title: res.data["msg"], icon: 'none' });
							}
							uni.hideLoading();
						},
						error => {
							console.log(error);
						}
					);
					
				
			},
			
			
		},
		onLoad() {
			
			
			this.getprouductdefault(450);
		}
	}
</script>

<style>
	.page {
		height: 100vh;
	}
	.tr270{
		transform: rotate(270deg);
	}
	.tr180{
		transform: rotate(180deg);
	}
	.tr90{
		transform: rotate(90deg);
	}

	.mle {          /* 水平镜像翻转 */
	            -moz-transform:scaleX(-1);
	            -webkit-transform:scaleX(-1);
	            -o-transform:scaleX(-1);
	            transform:scaleX(-1);
	            /*兼容IE*/
	            filter:FlipH;
	        }
	.mve {        /* 垂直镜像翻转 */
		-moz-transform:scaleY(-1);
		-webkit-transform:scaleY(-1);
		-o-transform:scaleY(-1);
		transform:scaleY(-1);
		/*兼容IE*/
		filter:FlipV;

	}
</style>
