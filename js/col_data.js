var personalInfomation = new Array();
var a = $('.birthplace .dropdown-toggle').text();
var b = $('.job .dropdown-toggle').text();
var c = $('.education .dropdown-toggle').text();
$('.birthplace .dropdown-menu li a').click(function(){
    var val = this.innerHTML;
    $('.birthplace button').html(val);
});
$('.job .dropdown-menu li a').click(function(){
    var val = this.innerHTML;
    $('.job button').html(val);
});
$('.education .dropdown-menu li a').click(function(){
    var val = this.innerHTML;
    $('.education button').html(val);
});

$("#ensure").click(function(){
	var flag = false;
	personalInfomation.push($('#Username').val());
    personalInfomation.push($('#birthYear').val());
    personalInfomation.push($('#birthMonth').val());
    personalInfomation.push($('#birthDay').val());
    personalInfomation.push($('#UserEmail').val());
    personalInfomation.push($('.birthplace button').text());
    personalInfomation.push($('.job button').text());
    personalInfomation.push($('.education button').text());
    console.log(personalInfomation);
    for(var i = 0;i < 5;i++){
        if(personalInfomation[i] == ''){
            flag = true;
            break;
        }
    }
    if(personalInfomation[5] == a){
        flag = true;
    }
    else if(personalInfomation[6] == b){
        flag = true;
    }
    else if(personalInfomation[7] == c){
        flag = true;
    }
	if(flag){
		alert("请完全填写信息！");
	}
	else{
        localStorage.record = ("\r\npersonalInfomation , " + personalInfomation.join(','));
        window.location.href = "agreement.html";
                
	}
});