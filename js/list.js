$(function(){
	//引入尾部
	function tj(){
		$('#header-w').load('com.html #header',function(){
			var first = $.cookie('nam')==null?false:true;//判断是否有cookie进行添加
			console.log(first)
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
	}
	tj()
	//二级菜单
	function list(){
		$('li:has(ul)').click(function(){
			$(this).find('ul').toggle()
			$(this).siblings().find('ul').css('display','none')
		})
	}
	list()
	//加载推荐内容
	function day(){
		var a=Math.ceil(Math.random()*60);
		//console.log(a) yz ww
		$.ajax({
            url:'date/ul.json',
            type:'GET',
            dataType:'json',
            success:function(res){
            	var html='<ul>'
            	for(var i=a;i<a+4;i++){
            		html += '<li id="'+res[i].id+'">';
                    html += "<img src=" +res[i].url+ ">";
                    html +=" <a>"+res[i].tip+"</a>"
                    html += "<p>￥"+res[i].price+"</p>"
                    html += "</li>";
					//html +='<li id="'+res[i].id+'"><img src="'+res[i].url+'"><a>"'+res[i].tip+'"</a><p>"'+res[i].price+'"</p></li>'
				}
            	html+='</ul>'
				$('.u2').html(html)
        	}
		})
	}
	day();
	//加载分页内容       
    function fen(num){
        $.ajax({
            url:'date/ul.json',
            type:'GET',
            dataType:'json',
            success:function(res){
                //1.计算分页数量
                var showNum=num;
                var dataL=res.length;
                //console.log(dataL) yz ww
                var pageNum=Math.ceil(dataL/showNum);
                $('#Pagination').pagination(pageNum,{
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 2, //主体页数
                    items_per_page: 1, //每页显示1项
                    prev_text: "上一页",
                    next_text: "下一页",
                    callback:function(index){
                        var html='<ul>'
                        for(var i = showNum*index; i < showNum*index+showNum;i++){
                           // console.log(i) yz ww
                            if(i<dataL){
                                var $id = res[i].id;
                                
                                html += '<li class="lie" id="'+res[i].id+'">';
                                html += "<img src=" +res[i].url+">";
                                html +=" <a>"+res[i].tip+"</a>"
                                html += "<p>￥"+res[i].price+"</p>"
                                html += "<span>已售："+res[i].xiao+"件</span>"
                                html += "<a href='xiang.html'>";
                                html+="<input type='button' value='加入购物车' class='btn'/>"
                                html += "</a>";
                                html+="<input type='button' value='收藏' class='btn1'/>"
                                html += "</li>";
                                
                            }
                        }
                        html+='</ul>';
                        $('#list').html(html)
                    }
                })  
            }
        })
    }
    fen(16)
    //实现点击时设置cookies,将点击产品的id存为cookies,并且跳转到购买页面
    function setCookies(){
		$("body").on("click",".lie",function(){
			$.cookie("id",this.id,{expires:3,path:"/"});
			window.open("xiang.html","_blank");
		})
	}
	setCookies();
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