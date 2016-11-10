$(function(){
	//引入头尾
	function yin(){
		$('#header-w').load('com.html #header',function(){
			var first = $.cookie('nam') == null?false:true;//判断是否有cookie进行添加
			//console.log(first)yz ww
			if(first){
				var name = $.cookie("nam");
				
				console.log($.cookie("nam"))
				$('.h-c').html("<span id='xian'>欢迎回来    "+name+"<span id='tui'>[退出]</span></span>")
				
				$('#tui').css({'cursor':'pointer',
								'color':'#e21357',
								'margin-left':'6px'})
			}
			//console.log($.cookie("nam"))yz ww
			$('#tui').click(function(){
				//alert(1)yz ww
				$.cookie('nam',null)//删除
				console.log(name)
				window.location.href = 'index.html'
			})
		})
		//$('#log-w').load('com.html #log')
		$('#footer-w').load('com.html #xia')
		sc_car()
	}
	yin()
	//加载图片
	$.ajax({
		url:'date/ul.json',
		type:"GET",
		success:function(res){
			var idNum=$.cookie("id");
			//for循环找到id
			for(var i=0;i<res.length;i++){
				if(res[i].id == idNum){
					//商品名称
					$('#d3').find('p').eq(0).html(res[i].tip);
					//商品价格
					$('#d3').find('.sp1').html(res[i].price);
					//商品主图
					$("#s_box").find("img").eq(0).attr("src",res[i].url);
					$("#s_box").find("img").eq(1).attr("src",res[i].src);
					//放大镜主图
					$("#b_box_all").find("img").eq(0).attr("src",res[i].url);
					$("#b_box_all").find("img").eq(1).attr("src",res[i].src);
					//小图
					$('.ul').find('li').eq(0).find("img").attr("src",res[i].url);
					$('.ul').find('li').eq(1).find("img").attr("src",res[i].src);
					//id
					$('.go').find('input').eq(1).attr("id",res[i].id);
				}
			}	
		}
	})
	//放大镜
	function fangdajing(){
		//获取元素
		var $fangdajing_mask = $(".mark_box");
		var $fangdajing = $(".position_box");
		var $pic_big_mask = $("#b_box_all");
		var $pic_big = $("#b_box"); 
		//获取鼠标在左侧图片上的位置
		$fangdajing_mask.mousemove(function(event){
			//console.log(1);//yz ww
			event = event || window.event;
			//鼠标的位置
			var left = event.offsetX - $fangdajing.width()/2;
			var top  = event.offsetY - $fangdajing.height()/2;
			//console.log(left);//yz ww
			//定义变量，posx,posy,确定放大镜移动到右侧的宽度和高度
			var posx  =  $fangdajing_mask.width() - $fangdajing.width();
			var posy  =  $fangdajing_mask.height() - $fangdajing.height();
			left = left < 0 ? 0 : left ;
			left = left > posx ? posx : left ;
			top  = top  < 0 ? 0: top  ;
			top  = top  > posy ? posy : top  ;
			//鼠标移动时，让透明放大镜的left和top等于鼠标位置
			$fangdajing.css({
				"left":left,
				"top" :top 
			});
			//让右侧图片跟随鼠标一起移动
			var  proLeft = left / posx ;
			var  proTop  = top  / posy ;
			$pic_big_mask.css({
				"left" : - proLeft * ($pic_big_mask.width()  - $pic_big.width()),
				"top"  : - proTop  * ($pic_big_mask.height() - $pic_big.height()),
			})
		})
		//鼠标划过左侧图片时，放大镜出现,大图出现
			$fangdajing_mask.mouseenter(function(){
				$fangdajing.css("display","block");
				$('#b_w').css("display","block");
				$pic_big.css("display","block");
			})
			//鼠标划出左侧图片时，放大镜，大图消失
			$fangdajing_mask.mouseleave(function(){
				$fangdajing.css("display","none");
				$('#b_w').css("display","none");
				$pic_big.css("display","none");
			})
	}
	fangdajing();

	//点击切换图片
	function change(){
		$('.ul').children().click(function(){
			//alert($(this).index()+1)yz ww
			var i=$(this).index()+1
			$('#s_box').children().eq(i).css('opacity',1);
			$('#s_box').children().eq(i).siblings().css('opacity',0);
			$('#s_box').children().eq(3).css('opacity',0.5)
			$('#b_box_all').children().eq(i-1).css('opacity',1);
			$('#b_box_all').children().eq(i-1).siblings().css('opacity',0);
		})
	}
	change()
	//加减
	function add(){
		var n=$('.jia').children().eq(1).val();
		$('.jia').children().eq(2).click(function(){
			//alert(1)yz ww
			if(n>=9){
				alert("您已满足团购条件，请联系客服人员")
			}
				n++
				$('.jia').children().eq(1).val(n)
				//$.cookie('n',n)
		})
		$('.jia').children().eq(0).click(function(){
			//alert(1)yz ww
			if(n==1){
				alert("所选商品不能少于1件")
			}else{
				n--
				$('.jia').children().eq(1).val(n)	
				//$.cookie('n',n)
			}
		})
		
		
	}
	add()
	//加载搭配
	function da(){
		var a=Math.ceil(Math.random()*60);
		//console.log(a) yz ww
		$.ajax({
            url:'date/ul.json',
            type:'GET',
            dataType:'json',
            success:function(res){
            	var html='<ul>'
            	for(var i=a;i<a+5;i++){
            		html += "<li>";
                    html += "<img src=" +res[i].url+ "/>";
                    html +=" <a>"+res[i].tip+"</a>"
                    html += "<p>"+res[i].price+"</p>"
                    html += "</li>";
				}
            	html+='</ul>'
				$('#da').find('div').html(html)
        	}
		})
	}
	da();
	//加载热销排行
	function hot(){
		var a=Math.ceil(Math.random()*60);
		//console.log(a) yz ww
		$.ajax({
            url:'date/ul.json',
            type:'GET',
            dataType:'json',
            success:function(res){
            	var html='<ul>'
            	for(var i=a;i<a+5;i++){
            		html += "<li>";
                    html += "<img src=" +res[i].url+ "/>";
                    html +=" <a>"+res[i].tip+"</a>"
                    html += "<p>"+res[i].price+"</p>"
                    html += "</li>";
				}
            	html+='</ul>'
				$('.l').find('div').html(html)
        	}
		})
	}
	hot();
	//选项卡
	function sp(){
		$('.r').children().find('li').click(function(){
			$(this).find('span').addClass('span');//添加class名
			$(this).siblings().find('span').removeClass('span');//移除class名
			//alert($(this).index())yz ww
			var i=$(this).index()
			$('.r').find('div').eq(i).addClass('block');
			$('.r').find('div').eq(i).siblings().removeClass('block');
		})
	}
	sp()
	//页面刷新时获取购物车数量;
	sc_car()
	$('.go').find('.btn').click(function(){
		//var i=$.cookie('n')
		//购物车数量增加;
		var id = this.id
		//alert(id)//yz ww
		alert('加入购物车成功')
		var first = $.cookie('goods')==null?true:false;//判断是否有cookie进行添加
		var same = false;//判断时候已经追加
		var val=$('.jia').children().eq(1).val()
		console.log(val)
		//是否是第一次添加
		if(first){
			//第一次添加,建立json结构。
			$.cookie('goods','[{id:'+id+',num:1}]');
			$.cookie('first','false');
		}else{
			var str = $.cookie('goods');
			var arr = eval(str);
			//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){		
					arr[attr].num = Number(arr[attr].num) +Number(val) ;  //让json结构中num自增。
					var cookieStr = JSON.stringify(arr);//将json对象转换成字符串.
					$.cookie('goods',cookieStr);
					same = true;
				}
			}
			//如果id不同，重新建立商品对象;
			if(!same){
				var obj={id:id,num:val};
				arr.push(obj);
				var cookieStr = JSON.stringify(arr);
				$.cookie('goods',cookieStr);
			}
		}
		sc_car()
	})
	//购物车;
	function sc_car(){
		var sc_str = $.cookie('goods');
		if(sc_str){//如果购物车cookie不为空。
			var sc_obj = eval(sc_str);
			var sc_num = 0 ; 
			for(var i in sc_obj){
				sc_num = Number(sc_obj[i].num) + sc_num;
				//console.log(sc_num)
			}
			$('#n').html(sc_num);
			//console.log($('.sc_num'))
		}
	}
	sc_car()
})