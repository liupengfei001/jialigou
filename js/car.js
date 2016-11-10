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
	$('#footer-w').load('com.html #xia')
	//加载商品信息
	function list(){
		$.ajax({
			url:'date/ul.json',
			type:'GET',
			success:function(res){
				var sc_str = $.cookie('goods');
				if(sc_str){
					var sc_obj = eval(sc_str);
					var html = ''; 
					for(var i in sc_obj){
						//console.log(sc_obj[i])
						//拼接
						html +='<li id='+sc_obj[i].id+'>'
						html +=	"<img src="+res[sc_obj[i].id-1].url+" />"
						html +='<div class="biao">'
						html +="<a>"+res[sc_obj[i].id-1].tip+"</a>"
						html +='<p>货号：20119400</p>'
						html +='<p>颜色/尺码 ：</p>'
						html +="<p>"+res[sc_obj[i].id-1].tip+"_ M码共同</p>"
						html +='</div>'
						html +="<span class='s'>"+res[sc_obj[i].id-1].price+"</span>"
						html +="<form class='jia'>"
						html +='<input type="button" class="jian" value="-"/>'
						html +='<input type="text" class="txt" value='+sc_obj[i].num+'>'
						html +='<input type="button" class="ad" value="+"/>'
						html +='</form>'
						html +='<span style="font-weight:600;width:144px">￥'+res[sc_obj[i].id-1].price+'</span>'
						html +="<input type='button' class='del' id='"+sc_obj[i].id+"' value='删除' />"//删除按钮
						html +='</li>'
					}
					$('.center').find('ul').html(html);
					
					jia()//加减
					ji()//计算
				}
			}
		})
	}
	list()
	//加减
	function jia(){
		var n=$('.txt').val();	
		$('.center').find('li').find('.ad').click(function(){//点击加号
			n=$(this).siblings('.txt').val()//重新赋值
			//alert(1)yz ww
			if(n>=9){
				alert("您已满足团购条件，请联系客服人员")
			}
			n++
			//console.log(n)yz ww
			$(this).siblings('.txt').val(n)//数量
			ji()//计算
		})
		$('.jian').click(function(){//点击减号
			//alert(1)yz ww
			n=$(this).siblings('.txt').val()//重新赋值
			if(n==1){
				alert("所选商品不能少于1件")
			}else{
				n--
				$(this).siblings('.txt').val(n)//数量
				ji()//计算
			}
		})
		
	}
	//计算
	function ji(){
		var n=0;//金额
		var l=0;//积分
		var m=$('.center').find('ul').children()//ul里面的li
		//console.log(m)yz ww
		for(var i=0;i<m.length;i++){
			n+=(m.eq(i).find('.txt').val())*(Number(m.eq(i).find('.s').html()))
			//console.log(Number(m.eq(i).find('.s').html()))//yzww
			l+=(m.eq(i).find('.txt').val())*52
		}
		$('#suan').children().eq(0).find('a').html(n+"元")//商品金额
		$('#suan').children().eq(1).find('a').html(0+"元")//运费
		$('#suan').children().eq(2).find('a').html(l+"分")//积分
		$('#suan').children().eq(3).find('a').html(n+"元")//总计
	}
	$('body').on('click','.del',function(){//点击删除按钮
		var conf=confirm('确定删除此条商品吗？');
		if(conf){//判断
			id=$(this).parents('li').attr('id');
			var str = $.cookie('goods');
			var arr = eval(str);
				//遍历所有对象。如果id相同，让该商品数量递增 ;
			for(var attr in arr){
				if(arr[attr].id == id){	
					delete arr[attr];	//删除当前商品的cookie信息；
					for(var k=0;k<arr.length;k++){	//两次循环便利所有，冒泡排序，把空的放最后
						for(var i=0;i<arr.length-1;i++){
						if(arr[i]==null){
							var m=arr[i+1];
								arr[i+1]=arr[i];
								arr[i]=m;
						}
					  }
					}
					arr.length=arr.length-1;	//原数组长度减一
				}
				var cookieStr = JSON.stringify(arr);//将json对象转换成字符串
					$.cookie('goods',cookieStr);
					//console.log($.cookie('goods'))
					same = true;
			}
			$(this).parents("li").remove();	//删除购物车里的该商品
			list();//更新购物车商品信息
			ji();//重新计算总价
		}
	});
	$('#end').on('click','.qing',function(){
		//alert(1)yz ww
		var conf=confirm('确定清空购物车吗？')
		if(conf){//判断
			$.cookie('goods',null)//清除cookie
			$.cookie("sc_num",null);//清除购物车数量
			window.location.href='car.html'
		}
	})
})