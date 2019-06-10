function submit(){
	var code = document.getElementById("code");
	var versionType = document.getElementById("versionType");
	var state = document.getElementById("state");
	// console.log(versionType.value);
	if(state.value==0){
		$.ajax({
			url:'http://188.131.151.49:8001/api/active/add',
			type:'POST',
			data:{
				code:code.value,
				versionType:versionType.value,
				version:1,
				user:localStorage.name
			},
			header:{
				Origin:'http://188.131.151.49/'
			},
			success:function(ret)
			{	
				if (ret.msg==="success") {

				var versionType =document.getElementById("versionType");
				var code =document.getElementById("code");
				var msg_log = document.getElementById("msg_log");
				var msg_logData = msg_log.innerHTML;
				msg_log.innerHTML = "\n"+'&nbsp&nbsp'+"激活成功!"+"\n"
									+'&nbsp&nbsp'+"操作员 : "+ret.data.name+"\n"
									+'&nbsp&nbsp'+"激活码 : "+code.value+"\n"
									+'&nbsp&nbsp'+"激活版本 : "+versionType.value+"\n"
									+'&nbsp&nbsp'+"激活时间 : "+ret.data.currentTime
									+"\n"+msg_logData;
				reset();
				}
				else if(ret.msg==="exist"){
					alert("已存在该账号,激活失败");
				}else{
					alert("激活失败")
				}
			},
			error:function(err)
			{
				alert("通信失败");
			}
		});
	}else if (state.value==1) {
		$.ajax({
			url:'http://188.131.151.49:8001/api/active/delete',
			type:'DELETE',
			dataType: "json",
			data:{
				code:code.value,
				versionType:versionType.value,
				user:localStorage.name
			},
			contentType:"application/x-www-form-urlencoded",
			// header:{
			// 	Origin:null
			// },
			success:function(ret)
			{
				if (ret.msg==="success") {
					alert("删除成功");
					// var code =document.getElementById("code");
					// var versionType =document.getElementById("versionType");
					// // 1.收到激活 并成功打印:
					// $("#msg_log").text("");
					// $("#msg_log").text("激活成功!" + <br /> + 
					// 	"操作员:" + name + "  " +
					// 	"激活码:" + code + "  " +
					// 	"激活版本:" + versionType + "  " +
					// 	"激活时间:" + time + "  " 
					// 	 );
				}else if(ret.msg==="not exist"){
					alert("不存在该账号,删除失败");
				}else{
					alert("删除失败")
				}
			},
			error:function(err)
			{
				alert("通信失败");
			}
		});
	}
	else if(state.value==2){
				$.ajax({
			url:'http://188.131.151.49:8001/api/active/log',
			type:'GET',
			data:{
				code:code.value,
				versionType:versionType.value
			},
			header:{
				Origin:'http://188.131.151.49/'
			},
			success:function(ret)
			{
					console.log(ret);
				if (ret.msg==="success") {
					// var code =document.getElementById("code");
					// var versionType =document.getElementById("versionType");
					// // 1.收到激活 并成功打印:
					// $("#msg_log").text("激活成功!" + <br /> + 
					// 	"操作员:" + name + "  " +
					// 	"激活码:" + code + "  " +
					// 	"激活版本:" + versionType + "  " +
					// 	"激活时间:" + time + "  " 
					// 	 );
				}else if(ret.msg==="exist"){
					alert("不存在该账号,查询失败");
				}
			},
			error:function(err)
			{
				alert("通信失败");
			}
		});
	}else if (state.value==3) {

			$.ajax({
			url:'http://188.131.151.49:8001/api/active/logAll',
			type:'GET',
			data:{
				code:code.value
			},
			header:{
				Origin:'http://188.131.151.49/'
			},
			success:function(ret)
			{
				alert("这是code:"+code)
						console.log(ret);
				if (ret.msg==="success") {
					// var code =document.getElementById("code");
					// var versionType =document.getElementById("versionType");
					// // 1.收到激活 并成功打印:
					// $("#msg_log").text("激活成功!" + <br /> + 
					// 	"操作员:" + name + "  " +
					// 	"激活码:" + code + "  " +
					// 	"激活版本:" + versionType + "  " +
					// 	"激活时间:" + time + "  " 
					// 	 );
				}else if(ret.msg==="exist"){
					alert("不存在该账号,查询失败");
				}
			},
			error:function(err)
			{
				alert("通信失败");
			}
		});
	}
}
function reset(){
	var code =document.getElementById("code");
	var versionType =document.getElementById("versionType");
	var state =document.getElementById("state");
	code.value = null;
	versionType.value = "color" ;
	state.value = 0 ;
}

function loginBtn(){
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
		$.ajax({
		url:'http://188.131.151.49:8001/api/auth',
		type:'POST',
		data:{
			username:username,
			password:password
		},
		header:{
			Origin:'http://188.131.151.49/'
		},
		success:function(ret)
		{
			if(ret.msg==="登陆成功"){
				alert(ret.user);
				localStorage.name = ret.user;
				var login =document.getElementById("login");
				var form =document.getElementById("form");
				login.style.display = "none";
				form.style.display = "flex";
			}else{
				$("#errormessage").text("用户名或密码错误");
			}
		},
		error:function(err)
		{
			alert("通讯失败");
		}
	});
}

