$(document).ready(function(){
	$("#entirety").click(submit);
	$("#close-box").click(function(){
		$("#box").css("display","none");
	});
}); 



function submit(){
	var name=$("#name").val(),
		phoneNum=$("#phoneNum").val(),
		budget=$("#budget").val(),
		city=$("#city").val();

		if(name==""){
			showAlert("请输入房屋面积");
			return false;
		}
		if(!checkPhone(phoneNum)){
			showAlert("请输入正确手机号");
			return false;
		}
		if(budget==0){
			showAlert("请选择预算");
			return false;
		}
		if(city==0){
			showAlert("请选择城市");
			return false;
		}

		$(this).attr("disabled","disabled");
		$.post("mobile_apply.php",{name:name,phone:phoneNum,city_id:city,yusuan:budget,act:'mobile'},function(data){
			if(data == 'success')
			{
				$("#name").val("").css("border-color","green");
				$("#phoneNum").val("").css("border-color","green");
				$("#city").val(0).css("border-color","green #E5E5E5 #E5E5E5 #E5E5E5");
				$("#box").css("display","block");
				setTimeout(function(){
					$("#box").css("display","none");
				},2500);
			}else if(data == 'error')
			{
				showAlert('请不要重复报名');
			}
			else
			{
				showAlert('请联系免费客服400-8617-000');
			}		
		});
} 
function showAlert(text){
	var alert=$("#alert");
		alert.stop(true);
		alert.html(text);
		alert.fadeIn(700);
		alert.fadeOut(3000);
}
function checkPhone(tel){
   var myreg = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
   if(!myreg.test(tel))
   {
     return false;
   }
   else{
  	 return true;
   }
}