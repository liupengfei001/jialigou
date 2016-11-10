$(function(){
	//引入尾部
	function tj(){
		$('#footer-w').load('com.html #xia')
	}
	tj()
	//表单验证
	$('form').validate()
	//注册验证
	$('#btn').click(function(){  //点击【注册】按钮触发事件
		var user = $('input[name=userID]').val(); //获取ID名
		var pasd = $('input[name=password]').val();//获取密码
		var pawd = $('input[name=password]').val();//获取确认密码
		//console.log(user+":"+pasd)//yz ww
		console.log($('form').find('input').eq(2).attr('class'))//yz ww
		if(user==""||pasd==""||pawd==""){
			alert("请输入您的账号信息")
		}else if($('form').find('input').eq(2).attr('class')=='valid'&$('form').find('input').eq(1).attr('class')=='valid'&$('form').find('input').eq(2).attr('class')=='valid'){//判断表单验证是否正确
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"register",
					userID:user,
					password:pasd
				},
				success:function(res){
					//console.log(typeof res)
					//console.log(res);
					switch(res){
						case "0":alert('用户名已存在');break;
						case "1":window.location.href='deng.html';break;
						case "2":alert('由于服务器原因，页面加载失败');break;
	
					}
				}
			})
		}else{
			alert("请输入正确的格式")
		}
	})
				
	
})
		