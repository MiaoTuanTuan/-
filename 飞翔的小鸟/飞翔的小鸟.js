window.onload=function(){
	var canvas=document.getElementById('cax');
	console.log('慢慢就习惯了');
	var ctx=canvas.getContext('2d');
	//获取图片信息
	
	var imge=[
		{name:'bg_day',site:'images/bg_day.png'},
		{name:'bird0_0',site:'images/bird0_0.png'},
		{name:'bird0_1',site:'images/bird0_1.png'},
		{name:'bird0_2',site:'images/bird0_2.png'},
		{name:'button_play',site:'images/button_play.png'},
		{name:'font_048',site:'images/font_048.png'},
		{name:'font_049',site:'images/font_049.png'},
		{name:'font_050',site:'images/font_050.png'},
		{name:'font_051',site:'images/font_051.png'},
		{name:'font_052',site:'images/font_052.png'},
		{name:'font_053',site:'images/font_053.png'},
		{name:'font_054',site:'images/font_054.png'},
		{name:'font_055',site:'images/font_055.png'},
		{name:'font_056',site:'images/font_056.png'},
		{name:'font_057',site:'images/font_057.png'},
	    {name:'land',site:'images/land.png'},
		{name:'pipe_down',site:'images/pipe_down.png'},
		{name:'pipe_up',site:'images/pipe_up.png'},
		{name:'text_game_over',site:'images/text_game_over.png'},
		{name:'title',site:'images/title.png'},
		{name:'tutorial',site:'images/tutorial.png'}
	];
	var imgobj={};
	var con=0;
	for(var i=0;i<imge.length;i++){
		var img=new Image();//创建一个图片对象
		img.src=imge[i].site;//将图片存在数组中可以遍历，将遍历的图片信息存在对象中直接调用
		imgobj[imge[i].name]=img;
		imgobj[imge[i].name].onload=function(){
			 con++;
			 if(con==imge.length){//通过判断让所有图片加载完成，才开始使用
				 homePage();
				
			 }			
		}
	}

    //开始页面 上面一个标题图，中间玩法介绍图，下面开始按钮
    function homePage(){
		     var scene=0;//0 表示场景一，1 表示场景二 2　表示场景三
		　　　//背景图
		     var temp=0;//标题下落动画
			 var opt=1;//透明度
			 var m=-0.1;//透明度的改变状态
			 var left=0;//背景左移状态
			 var times=setInterval(home,20);
			 var time_1;//二号定时器
			 var time_2;//三号定时器
			 var sum=Math.floor(Math.random()*200+30);//最大两百三，最小三十，假设这上面柱子
			 var sum_1=400-140-sum;//这是下面柱子
			 var left_1=300;//管道移动
			 var bottom_y=150;//小鸟初始坐标
			 var bottom_x=50;
			 var toggle=0;//小鸟翅膀切换；
			 var score=0;
			 var short=0;
			 function home(){
				 ctx.drawImage(imgobj.bg_day,0,0)//九个参数，参数  1表示 图片地址，2   3表示截取源图片的起始坐标  4  5 目标所在位置  6 7
				 //标题图
				 temp+=5;
				 if(temp>130){
					 temp=130;
				 }
				 ctx.drawImage(imgobj.title,50,temp);
				 //闪烁图
				 opt+=m;
				 if(opt<0.3){
					 m=0.1;
				 }
				 if(opt>1){
					 m=-0.1;
				 }
				 ctx.save();//保存当前图像
				 ctx.globalAlpha=opt;
				 ctx.drawImage(imgobj.tutorial,87,200);
				 ctx.restore();//修复当前图像
				 ctx.drawImage(imgobj.button_play,0,70,116,70,86,330,116,70);
			 }
		     canvas.onclick=function(ev){
				 var ev=ev||event;
				 var x=ev.pageX;
				 var y=ev.pageY;
				 var w_x=this.offsetLeft;
				 var w_y=this.offsetTop;
				 x=x-w_x;
				 y=y-w_y;
				 if((y>330&&y<400)&&(x>86&&x<198)){
					 scene=1;
					 clearInterval(times);
					 canvas.onclick=null;
		         }
				 if(scene==1){
					time_1=setInterval(play,8);
				 }  
			 }
			
			
			 //游戏场景
			 function play(){
		            left-=1.5;
			 	    if(left<-288){
			 		    left=0;	
			 		}
			 		ctx.drawImage(imgobj.bg_day,left,0);//两张背景图
			 		ctx.drawImage(imgobj.bg_day,left+288,0)
			 		ctx.drawImage(imgobj.land,0,400);
			 		ctx.drawImage(imgobj.land,336,400);	
					
					left_1-=1.5;
					if(left_1<-88){
						left_1=300;
						sum=Math.floor(Math.random()*200+30);//最大两百三，最小三十，假设这上面柱子
						sum_1=400-140-sum;//这是下面柱子
					
					}
					if(left_1>98.5){
						short=0;
					}
					if(left_1<100&&short==0){
						short=2;
						score++;
					}
						//小鸟飞过柱子实际上就是柱子的x值小于，小鸟的x值加小鸟的宽度	
					var str=score.toString();
					for( var i=0;i<str.length;i++){
						var ss='font_0'+(48+Number(str[i]));
						var ss=imgobj[ss];
						ctx.drawImage(ss, 110+24*i,50);
					}
					ctx.drawImage(imgobj.pipe_down,0,320-sum,52,sum,left_1,0,52,sum);//上面水管
					ctx.drawImage(imgobj.pipe_up,0,0,52,sum_1,left_1,400-sum_1,52,sum_1);//下面水管
					//写小鸟
					bottom_y+=1;
					toggle++;
					if(toggle<10){
						ctx.drawImage(imgobj.bird0_0,bottom_x,bottom_y);
					}
					else if(toggle<20){
						ctx.drawImage(imgobj.bird0_0,bottom_x,bottom_y);
					}
					else if(toggle<30){
						ctx.drawImage(imgobj.bird0_2,bottom_x,bottom_y);
					}
					else{
						toggle=0;
					}
					ctx.save();
					ctx.translate(bottom_x+24,bottom_y+24);
					ctx.drawImage(imgobj.bird0_0,-24,-24);
					ctx.rotate(Math.PI/6);
					ctx.restore();
					
					//起飞
					canvas.onclick=function(){
					    var t=setInterval(function(){
							bottom_y-=2;
						},8);
						setTimeout(function(){
							clearInterval(t);
						},200)
					}
				
					//游戏怎么触发停止，第一个条件，碰到地面死，第二个条件碰到水管死
					if(bottom_y>(400-40)){
						scene=2;
					}
					//触发条件要减去小鸟图片的宽度，计算坐标是以左上角定点，不然就会卡在管子里，或者地面里
					//区间判断,水管的宽度的52,在这个范围之内都要做判断
					if(left_1<(bottom_x+40)&&(left_1+52)>bottom_x){
							if(bottom_y-8<sum){
								scene=2;
								clearInterval(time_1);
							}
							 if(bottom_y>(sum+140-40)){
								 clearInterval(time_1);
								 scene=2;
							}			
				
							
					}
					if(scene==2){
						clearInterval(time_1);
						time_2=setInterval(vaer,8);
					}
					console.log(scene);
				 }
				 function vaer(){
					 //不管的撞柱子还是撞地面最终都要到地面，
					if(left_1<100){
						 bottom_x-=0.2;	
					}
					 bottom_y+=2;
					 //重新绘制避免图片，重叠
					 ctx.drawImage(imgobj.bg_day,0,0)
					 ctx.drawImage(imgobj.land,0,400);
					 ctx.drawImage(imgobj.land,336,400);	
					 ctx.drawImage(imgobj.pipe_down,0,320-sum,52,sum,left_1,0,52,sum);//上面水管
					 ctx.drawImage(imgobj.pipe_up,0,0,52,sum_1,left_1,400-sum_1,52,sum_1);//下面水管
					 if(bottom_y>400-40){
						 clearInterval(time_2);
					 }
					 ctx.drawImage(imgobj.bird0_2,bottom_x,bottom_y);
					 ctx.drawImage(imgobj.text_game_over,42,150);
					 //加一个开始场景的按钮
					 ctx.drawImage(imgobj.button_play,0,0,116,70,86,400,116,70);
				     canvas.onclick=function(ev){
				     	var ev=ev||event;
				     	var x=ev.pageX;
				     	var y=ev.pageY;
				    	var w_x=this.offsetLeft;
				     	var w_y=this.offsetTop;
				     	x=x-w_x;
				     	y=y-w_y;
				     	if((y>400&&y<470)&&(x>86&&x<172)){
				     		scene=0;
							ctx.clearRect(0,0,288,512);
							homePage();
				         }
				     }
				 }
			 
	}
    //游戏页面  画面在动，小鸟是上下移动，看起来是小鸟动，实际上小鸟并没有向前面移动

    //结束页面，结束页面就是画面停止，弹出一个结束图片







}