$(function(){
	//引入头尾
	$('#header-w').load('com.html #header',function(){
		var first = $.cookie('nam')==null?false:true;//判断是否有cookie进行添加
		//console.log(first)
		if(first){
			var name=$.cookie("nam");
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
			window.location.href='index.html'
		})
	})
	//$('#log-w').load('com.html #log')
	$('#footer-w').load('com.html #xia')
	//轮播图
	function ban(){
		var timer;
		var index=0;
		function ind(){
			if(index==$('#ban').find('li').length-1){
				index=0;
			}else{
				index++;
			}		
			//console.log(index) yz ww
			$('#ban').find('li').eq(index).fadeIn().siblings().fadeOut();
			$('.btn').find('span').eq(index).addClass('active').siblings().removeClass('active');
			//$('span').eq(index).removeClass('active');
			
		}
		timer=setInterval(ind,3000);
	
		$('.btn').children().mouseover(function(){
			clearInterval(timer);
			$(this).addClass('active').siblings().removeClass('active');
	
		})
		$('.btn').children().mouseout(function(){
			timer=setInterval(ind,3000);
		})
		$('.btn').children().mouseover(function(){
			index=$(this).index();
			$('#ban').find('li').eq(index).fadeIn().siblings().fadeOut();
		})
	}
	ban();
	//二级菜单
	function list(){
		$('li:has(ul)').mouseover(function(){
			//alert(1)yz ww
				$(this).find('ul').css('display','block')
		})
		$('li:has(ul)').mouseout(function(){
			//alert(1)yz ww
				$(this).find('ul').css('display','none')
		})
	}
	list()
	//加载今日热播
	function day(){
		$.ajax({
            url:'date/list.json',
            type:'GET',
            dataType:'json',
            success:function(res){
            	var html=''
            	for(var i=0;i<res.length;i++){
            		html += '<li><img src="'+res[i].url+'" /><a>'+res[i].tip+'</a><p>'+res[i].price+'</p></li>';
            	}
				$('#zhu').find('ul').eq(0).html(html)
        	}
		})
	}
	day();
	//今日热播滚动
	function hot(){
		var ul=$('#hot').find('ul');
		var img=$('#hot').children('img');
		//console.log(img) yz ww
		$('#hot').mouseover(function(){
			img.css('display','block');
		})
		$('#hot').mouseout(function(){
			img.css('display','none');
		})
		var n=0;//ul.offsetLeft
		img.eq(1).click(function(){//右按钮事件
			if(n==-4940){//判断当达到最后一页
				n=0;
				ul.css('left',n)
			}else{
				n-=988
				ul.css('left',n)
			}
			//console.log(n) yz ww
		})
		img.eq(0).click(function(){//左按钮事件
			if(n==0){//判断当达到第一页
				n=-4940
				ul.css('left',n)
				
			}else{
				n+=988;
				ul.css('left',n)
				
			}
			//console.log(n) yz ww
		})
	}
	hot()
	//动态获取楼梯列表
	function listGet(){
		$.ajax({
            url:'date/list.json',
            type:'GET',
            dataType:'json',
            success:function(res){
            	var html=''
            	var html1=''
            	var html2=''
            	var html3=''
            	for(var i=0;i<6;i++){
            		html += '<li><img src="'+res[i].url+'" /><a>'+res[i].tip+'</a><p>'+res[i].price+'</p></li>';
            	}
				$('#zhu').find('ul').eq(2).html(html)
				for(var i=6;i<12;i++){
            		html1 += '<li><img src="'+res[i].url+'" /><a>'+res[i].tip+'</a><p>'+res[i].price+'</p></li>';
            	}
				$('#zhu').find('ul').eq(3).html(html1)
				for(var i=12;i<18;i++){
            		html2 += '<li><img src="'+res[i].url+'" /><a>'+res[i].tip+'</a><p>'+res[i].price+'</p></li>';
            	}
				$('#zhu').find('ul').eq(4).html(html2)
				for(var i=18;i<24;i++){
            		html3 += '<li><img src="'+res[i].url+'" /><a>'+res[i].tip+'</a><p>'+res[i].price+'</p></li>';
            	}
				$('#zhu').find('ul').eq(5).html(html3)
        	}
		})
	}
	listGet();
	//加载购物车数量
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
