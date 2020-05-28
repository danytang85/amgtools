<template>
	<view class="bg-white;" >
		
		<view class="margin-top">
		<view class="grid text-center  " v-for="(it,index) in allarrayliubaiban" :key="index" >
			<view class=""  style="display: flex;align-items: center;justify-content: center;border-left:1px solid #ffffff; border-bottom: 1px solid #ffffff; text-align: center; background-color:#cccccc;" :style="'width:'+item.width+'px; height:'+item.height+'px; background-color:'+item.bgcolor+';'"  v-for="(item,index) in it" :key="index"   >
			
			{{item.name}}
			
			</view>
		</view>
		</view>
	</view>
	
</template>

<script>
	
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				windowWidth:400,
				sinwidthmodel:45,
				curwidth:300,//宽度
				curheight:300,//长度
				sebla:1,
				firstwidth:0,
				firstheight:0,
				allarrayliubaiban:[]
			};
		},
		
		methods: {
			
			getfirstlibaiban(){ //留白板方案 计算第一块板的大小
					var wnum=Math.floor(this.curwidth/this.sinwidthmodel);
					var modnum=this.curwidth%this.sinwidthmodel;
					var firstwidth;
					var widthisliubai=false;
					var heightisliubai=false;
					if(modnum!=0){
						firstwidth=(this.curwidth-this.sinwidthmodel*wnum)/2;
						widthisliubai=true;
						wnum=wnum+2;
					}else{//宽度刚刚好！
						firstwidth=this.sinwidthmodel;
					}
					
					var hnum=Math.floor(this.curheight/this.sinwidthmodel);
					var modnum=this.curheight%this.sinwidthmodel;
					var firstheight;
					
					if(modnum!=0){
							firstheight=(this.curheight-this.sinwidthmodel*hnum)/2;
							heightisliubai=true;
							hnum=hnum+2;
					}else{//宽度刚刚好！
						firstheight=this.sinwidthmodel;
					}
					
					return {width:firstwidth,height:firstheight,widthisliubai:widthisliubai,heightisliubai:heightisliubai,row:hnum,cols:wnum};
				
			},
			
			getbilipx(val,cur){
				
			  return Math.floor(this.windowWidth*(val/cur));
			},
			
			
			
			getliubaibanarray(arr){
				var firstwidth=arr.width;
				var firstheight=arr.height;
				var cols=arr.cols;
				var row=arr.row;
				var heightisliubai=arr.heightisliubai;
				var widthisliubai=arr.widthisliubai;
				console.log(arr);
				for(var p=1;p<=row;p++){//行
					var temparrayliubaiban=[];
					for(var i=1;i<=cols;i++){
						var j=[];
						j.bgcolor="#cccccc";
						if(i==1 || i==cols){ //第一列与最后一列
							j.img="";
							
							
							if(widthisliubai==false && heightisliubai==true){
								if((p==2 && i==1) || (p==row-1 && i==cols)||(p==2 && i==cols)||(p==row-1 && i==1)){
									j.bgcolor="#675ac6";
								}
							}
							
							
							if(p==1 || p==row){//第一列，第一行
							
								if(widthisliubai==false && heightisliubai==false){
									j.bgcolor="#675ac6";
								}else{
									j.bgcolor="#cccccc";
								}
								
								
								j.width=this.getbilipx(firstwidth,this.curwidth);
								j.height=this.getbilipx(firstheight,this.curwidth);
								j.name=firstheight;
							}else{
								j.width=this.getbilipx(firstwidth,this.curwidth);
								j.height=this.getbilipx(this.sinwidthmodel,this.curwidth);
								j.name=firstwidth;
								
							}
							
							j.img="";
							temparrayliubaiban.push(j);
						}else{ //其它列其它行
							if(p==1 || p==row){//第一行最后一行
								j.width=this.getbilipx(this.sinwidthmodel,this.curwidth);
								j.height=this.getbilipx(firstheight,this.curwidth);
								j.name=firstheight;
								
								
								if(widthisliubai && heightisliubai==false){
									
									if((p==1 && i==2) || (p==row && i==cols-1)||(p==1 && i==cols-1)||(p==row && i==2)){
										j.bgcolor="#675ac6";
									}
									
								}
								
								
							}else{
								if(widthisliubai==true && heightisliubai==true){
									if((p==2 && i==2)||(p==row-1 && i==cols-1)||(p==2 && i==cols-1)||(p==row-1 && i==2)){
										j.bgcolor="#675ac6";
									}else{
										j.bgcolor="#d1a741";
									}
									
								}else{
									j.bgcolor="#d1a741";
								}
								
								j.width=this.getbilipx(this.sinwidthmodel,this.curwidth);
								j.height=this.getbilipx(this.sinwidthmodel,this.curwidth);
								j.name=this.sinwidthmodel;
							}
							
							
							
							temparrayliubaiban.push(j);
						}
						
					}
					
					this.allarrayliubaiban.push(temparrayliubaiban)
					
					
				}
				
				// console.log(this.allarray4s5r);
				
				
			},
			
			gets(){
				try {
				    const res = uni.getSystemInfoSync();
					this.windowWidth=res.windowWidth;
					
					this.getliubaibanarray(this.getfirstlibaiban());
					
					//console.log(this.getfirstlibaiban());
				} catch (e) {
				    // error
				}	
			},
			
		},
		onLoad(){
			this.gets();
			
		}
		
	}
	
</script>

<style>
</style>
