$(document).ready(function(){

	// $("#close-box").click(function(){
	// 	$("#box").css("display","none");
	// });
	$(".areaRadio").click(areaChoose);
	$("#areaChoose").click(areaBanner);
	$("#hotSort").click(hotSort);
	$(".sortRadio").click(sortRadio);
	$("#close_form").click(closeForm);
	$(".listImg").click(showForm);
	$(".companyName").click(showForm);
	$("#close-box").click(closeBox);
	$("#entirety").click(submit);
}); 

function closeForm(){
	$("#yuyue").css("display","none");
}
function showForm(){
	$("#yuyue").css("display","block");
}
function closeBox(event,time){
	var box=$("#box");
	if(time==undefined){
		box.css("display","none");
		return true;
	}

	setTimeout(function(){
		box.css("display","none");
	},time);
}

function areaChoose(){
	var self=$(this),
		text=self.data("area"),
		num=self.data("num"),
		areaChoose=$("#areaChoose");
		areaChoose.text(text);
}
function areaBanner(num){
	// console.log(isNaN(num));
	if(typeof num!="number"){
		var self=$(this),
			state=self.attr("data-state")-0;
	}else{
		var self=$("#areaChoose"),
			state=num;
	}
		
		if(state==0){
			hotSort(1);
			$(".areaBanner").css("display","block");
			$("#areaTrangle").addClass("turnAround");
			self.attr("data-state",1);
		}else if(state==1){
			$(".areaBanner").css("display","none");
			$("#areaTrangle").removeClass("turnAround");
			self.attr("data-state",0);
		}else{return false;}
}
function hotSort(num){
	if(typeof num!="number"){
		var self=$(this),
			state=self.attr("data-state")-0;
	}else{
		var self=$("#hotSort"),
			state=num;
	}
		if(state==0){
			areaBanner(1);
			$(".sortBanner").css("display","block");
			$("#sortTrangle").addClass("turnAround");
			self.attr("data-state",1);
		}else if(state==1){
			$(".sortBanner").css("display","none");
			$("#sortTrangle").removeClass("turnAround");
			self.attr("data-state",0);
		}else{return false;}
}
function sortRadio(){
	var self=$(this),
		text=self.data("area"),
		num=self.data("num"),
		hotSort=$("#hotSort");
		hotSort.text(text);
}
function submit(){
	var name=$("#name").val(),
		phoneNum=$("#phoneNum").val(),
		city=$("#city").val();

		if(name==""){
			showAlert("请输入房屋面积");
			return false;
		}
		if(!checkPhone(phoneNum)){
			showAlert("请输入正确手机号");
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
				closeBox(122,2000);
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