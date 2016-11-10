$(function(){
	//引入尾部
	function tj(){
		$('#footer-w').load('com.html #xia')
	}
	tj()
	//登录
	$('input[type=button]').click(function(){
		var ID = $('input[type=text]').eq(0).val();
		var password = $('input[type=password]').eq(0).val();
		var nub = $('input[type=text]').eq(1).val();
		//console.log(ID+":"+password+":"+nub);//yz ww
		yan()//验证码
		console.log(num[a-2]+":"+nub);//yz ww
		if(ID==""||password==""){
			alert('请输入您的账号信息')
		}else if(nub==num[a-2]){
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"POST",
				data:{
					status:"login",
					userID:ID,
					password:password
				},
				success:function(res){
					switch(res){
						case "0":alert('用户名不存在');break;
						case "2":alert('用户名密码不符');break;
						default:$.cookie("nam",ID);window.location.href='index.html';break;
					}
				}
			})
		}else{
			alert('请输入正确验证码')
		}
	})
	//验证码
	var img=document.getElementById('yan');
	var i=0;
	var num
	img.onclick=yan
	a=Math.ceil(Math.random()*20)//随机数
	function yan(){
		num=["4rsw","11ck","fdkf","hck4","38td","tm54","tikg","dsk2","unax","qvkq","6kae","6red","cwe4","q3yk","zye6","16my","zfsc","qbzd","bkig","pec6"]
		if(a==num.length){
			a=1
			img.src="img/num/"+a+".png";
		}else{
			a++
			//console.log(i)
			img.src="img/num/"+a+".png";
		}
		//alert(a)//yz ww
		//alert(num[a-1])//yz ww	
	}
	yan()
})