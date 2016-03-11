var i = 0, j = 0, z = 0;
var randomArray = new Array();
var randomArrayLength;
var timeRecord = new Array();
var totalTime = new Date().getTime();
var timerBegin = totalTime;
var isPractice = true;
var isOpposite = false;
var wordType = $(".word")[0].id;

getWords(wordType);

$(document).on({
    keydown: function(e) {
        console.log(timeRecord);
        console.log(randomArray);
        if (e.keyCode == 68) {
            chickButton();
            nextWord();
        }
        if (e.keyCode == 75) {
            chickButton();
            nextWord();
        }
    }
});

function chickButton() {
    if (randomArray.length == 0) {
        timeRecord.shift();
        if (!isPractice) {
            if (isOpposite) {
                if (randomArrayLength == timeRecord.length) {
                    $.post("http://localhost:8088/oppositeExam", timeRecord.join(','),
                    function() {
                        if(wordType == "emotion"){
                            window.location.href = "e2h.html"; //结束跳转
                        }
                        else if(wordType == "health"){
                            window.location.href = "over.html"; //结束跳转
                        }
                        else if(wordType == "person"){
                            window.location.href = "p2f.html"; //结束跳转
                        }
                        else if(wordType == "feeling"){
                            window.location.href = "f2e.html"; //结束跳转
                        }
                        else if(wordType == "health0"){
                            window.location.href = "h2h.html"
                        }
                    }).error(function(){
                        alert("抱歉！您的实验数据提交失败，请重新开始实验");
                    });
                }
                else {
                    var err = '测试未做完';
                    $.post("http://localhost:8088/oppositeExam", err,
                    function() {
                        if(wordType == "emotion"){
                            window.location.href = "e2h.html"; //结束跳转
                        }
                        else if(wordType == "health"){
                            window.location.href = "over.html"; //结束跳转
                        }
                        else if(wordType == "person"){
                            window.location.href = "p2f.html"; //结束跳转
                        }
                        else if(wordType == "feeling"){
                            window.location.href = "f2e.html"; //结束跳转
                        }
                        else if(wordType == "health0"){
                            window.location.href = "h2h.html"
                        }
                    }).error(function(){
                        alert("抱歉！您的实验数据提交失败，请重新开始实验");
                    });
                }
            }//--isOpposite
            else {
                if (randomArrayLength == timeRecord.length) {
                    $.post("http://localhost:8088/originalExam", timeRecord.join(','),
                    function() {
                        
                    }).error(function(){
                        alert("抱歉！您的实验数据提交失败，请重新开始实验");
                    });
                        isOpposite = !isOpposite;
                        isPractice = !isPractice;
                        warning();
                } else {
                    var err = '测试未做完';
                    $.post("//localhost:8088/originalExam", err,
                    function() {
                        
                    }).error(function(){
                        alert("抱歉！您的实验数据提交失败，请重新开始实验");
                    });
                        isOpposite = !isOpposite;
                        isPractice = !isPractice;
                        warning();
                }
            }
        }//--!isPractice
        else {
            isPractice = !isPractice;
            warning();
        }
        timeRecord = [];
        getWords(wordType);
    }
}

function nextWord(){
    //console.log(timeRecord);
    //console.log(randomArray);
    $('.word').html(randomArray[0]);
    randomArray.shift();
    var timerEnd = new Date().getTime();
    timeRecord.push(timerEnd - timerBegin);
    timerBegin = timerEnd;
}

function getWords(path) {
    console.log('拿到词组',isPractice);
    var data = new Array();
    $.getJSON("word.json",
    function(words) {
        if(path == 'emotion'){
            data = words.emotion;
        }
        else if(path == 'health'){
            data = words.health;
        }
        else if(path == 'person'){
            data = words.person;
        }
        else if(path == 'health0'){
            data = words.health0;
        }
        else if(path == 'feeling'){
            data = words.feeling;
        }
        randomArrayLength = data.length;
        var num = new Array;
        for(var i = 0; i < randomArrayLength; i++){ 
            num[i] = i + 1; 
        } 
        for(var num, i = 0;i < randomArrayLength; i++){ 
            do{ 
                num = Math.floor(Math.random() * randomArrayLength); 
            }
            while(data[num] == null); 
            randomArray[i] = data[num];
            data[num] = null; 
        }
        $("#word").html(data[z]);
        showState();
        tiaoshi();
        changeSide(isOpposite, wordType);
    });
    var timerEnd = new Date().getTime();
    timerBegin = timerEnd;
}

function changeSide(bool, wordType) {
    var a,b,c,d;
    c = "我";
    d = "他人";
    if(wordType == "emotion"){
        a = "幸福";
        b = "不幸福";
    }
    else if(wordType == "health"){
        a = "健康";
        b = "不健康";
    }
    else if(wordType == "person"){
        a = "";
        b = "";
    }
    else if(wordType == "feeling"){
        a = "";
        b = "";
        c = "幸福";
        d = "不幸福";
    }
    else if(wordType == "health0"){
        a = "";
        b = "";
        c = "健康";
        d = "不健康";
    }
    if (bool) {
        $(".emotion")[0].innerHTML = a;
        $(".emotion")[1].innerHTML = b;
        $(".person")[1].innerHTML = c;
        $(".person")[0].innerHTML = d;
    } 
    else {
        $(".emotion")[0].innerHTML = a;
        $(".emotion")[1].innerHTML = b;
        $(".person")[0].innerHTML = c;
        $(".person")[1].innerHTML = d;
    }
}
function tiaoshi() {
    var a,b,c;
    if(isOpposite){
        a = '反向';
    }
    else{
        a = '正向'
    }
    if(isPractice){
        b = '练习'
    }
    else{
        b = '正式';
    }
    if(wordType == "emotion"){
        c = '情感';
    }
    else if(wordType == "health"){
        c = '健康';
    }
    else{
        c = '其它';
    }
    console.log("wordType:" + c + wordType + "isOpposite:" + a + isOpposite + "isPractice:" + b + isPractice);

}
function showState() {
    var b;
    if(isPractice){
        b = '练习'
        $(".status").html("<br />现在的实验状态：" + b + "阶段（允许出错）");//fix
    }
    else{
        b = '正式';
        $(".status").html("<br />现在的实验状态：" + b + "阶段（细心、仔细）");//fix
    }
}
function warning() {
            if(isPractice){
                alert("正式阶段结束，练习阶段开始，注意：选项有部分改动！！！");
                $(".word").html("此处显示测试词<br />点击D或者K按键开始测试");
            }
            else{
                alert("正式阶段开始,您的选择将决定实验结果。");
                $(".word").html("此处显示测试词<br />点击D或者K按键开始测试");
            }
}