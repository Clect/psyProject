var i = 0, j = 0, z = 0;
var randomArray = new Array();
var randomArrayLength;
var timeRecord = new Array();
var choiceRecord = new Array();
var totalTime = new Date().getTime();
var timerBegin = totalTime;
var isPractice = true;
var isOpposite = false;
var level = 0;
var wordType = $(".word")[0].id;



if(wordType == "personEmotion"){
    getWords('person');
}
else{
    getWords('emotion');
}

$(document).on({
    keydown: function(e) {
        if (e.keyCode == 68) {
            console.log(timeRecord);
            console.log(randomArray);
            console.log(choiceRecord);
            chickButton();
            if(judge(isOpposite, $(".word").html(), 68) == 0){
                choiceRecord.push(0);
                console.log("错");
            }
            else{
                choiceRecord.push(1);
                console.log("对");
            }
            nextWord();
        }
        if (e.keyCode == 75) {
            console.log(timeRecord);
            console.log(randomArray);
            console.log(choiceRecord);
            chickButton();
            if(judge(isOpposite, $(".word").html(), 75) == 0){
                choiceRecord.push(0);
                console.log("错");
            }
            else{
                choiceRecord.push(1);
                console.log("对");
            }
            nextWord();
        }
    }
});

function chickButton() {
    if (randomArray.length == 0) {
        timeRecord.shift();//把第一个词选之前的时间释放出来
        choiceRecord.shift();
        if (!isPractice) {
            if (!isOpposite) {
                if (randomArrayLength - 1 == timeRecord.length) {
                    localStorage.record += (",original, " + timeRecord.join(','));
                    localStorage.record += (",originalChoice , " + choiceRecord.join(','));
                    isPractice = true;
                    isOpposite = true;
                    if(wordType == "personEmotion"){
                        getWords('person');
                    }
                    else{
                        getWords('emotion');
                    }
                    alert("继续练习");
                }
                else {
                    var err = '测试未做完';
                    localStorage.record += (",original, " + timeRecord.join(',') + "," + err + "," + randomArrayLength + "," + timeRecord.length);
                    localStorage.record += (",originalChoice , " + choiceRecord.join(','));
                    isPractice = true;
                    isOpposite = true;
                    if(wordType == "personEmotion"){
                        getWords('person');
                    }
                    else{
                        getWords('emotion');
                    }
                    alert("继续练习");
                }
            }
            else {
                if (randomArrayLength - 1 == timeRecord.length) {
                    localStorage.record += (",opposite , " + timeRecord.join(','));
                    localStorage.record += (",oppositeChoice , " + choiceRecord.join(','));
                    if(level == 6){
                        if(wordType == "personEmotion"){
                            window.location.href = "middle.html"
                        }
                        else{
                            window.location.href = "over.html"
                        }
                    }
                    alert("此部分实验结束");
                }
                else {
                    console.log("error!!!!!!!!",randomArrayLength, timeRecord.length);
                    var err = '测试未做完';
                    localStorage.record += (",original, " + timeRecord.join(',') + "," + err + "," + randomArrayLength + "," + timeRecord.length);
                    localStorage.record += (",originalChoice , " + choiceRecord.join(','));
                    if(level == 6){
                        if(wordType == "personEmotion"){
                            window.location.href = "middle.html"
                        }
                        else{
                            window.location.href = "over.html"
                        }
                    }
                    alert("此部分实验结束");
                }
            }
        }
        else {
            level++;
            if(level == 1){
                if(wordType == "personEmotion"){
                    getWords('emotion');
                }
                else{
                    getWords('health');
                }
                alert("继续练习");
            }
            else if(level == 2){
                if(wordType == "personEmotion"){
                    getWords('personEmotion');
                }
                else{
                    getWords('emotionHealth');
                }
                alert("继续练习");
            }
            else if(level == 3){
                isPractice = false;
                if(wordType == "personEmotion"){
                    getWords('personEmotion');
                }
                else{
                    getWords('emotionHealth');
                }
                alert("开始测试");
            }
            else if(level == 4){
                if(wordType == "personEmotion"){
                    getWords('emotion');
                }
                else{
                    getWords('health');
                }
                alert("继续练习");
            }
            else if(level == 5){
                if(wordType == "personEmotion"){
                    getWords('personEmotion');
                }
                else{
                    getWords('emotionHealth');
                }
                alert("继续练习");
            }
            else if(level == 6){
                isPractice = false;
                if(wordType == "personEmotion"){
                    getWords('personEmotion');
                }
                else{
                    getWords('emotionHealth');
                }
                alert("开始测试");
            }
        }
        timeRecord = [];
        choiceRecord = [];
    }
}

function nextWord(){
    $('.word').html(randomArray[0]);
    randomArray.shift();
    var timerEnd = new Date().getTime();
    timeRecord.push(timerEnd - timerBegin);
    timerBegin = timerEnd;
}

function getWords(path) {
    console.log("拿到词组",path,level,isPractice);
    var data = new Array();
    $.getJSON("word.json",
    function(words) {
        if(path == 'person'){
            data = words.person;
        }
        else if(path == 'emotion'){
            data = words.emotion;
        }
        else if(path == 'health'){
            data = words.health;
        }
        else if(path == 'personEmotion'){
            if(isPractice){
                data = words.personEmotion_;
            }
            else{
                data = words.personEmotion;
            }
        }
        else if(path == 'emotionHealth'){
            if(isPractice){
                data = words.emotionHealth_;
            }
            else{
                data = words.emotionHealth;
            }
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
        changeSide(isOpposite, path);
    });
    var timerEnd = new Date().getTime();
    timerBegin = timerEnd;
}

function changeSide(bool, path) {
    var a,b,c,d;
    if(path == "person"){
        a = "";
        b = "";
        c = "我";
        d = "他人";
    }
    else if(path == "emotion"){
        a = "幸福";
        b = "不幸福";
        c = "";
        d = "";
    }
    else if(path == "health"){
        a = "";
        b = "";
        c = "健康";
        d = "不健康";
    }
    else if(path == "personEmotion"){
        a = "幸福";
        b = "不幸福";
        c = "我";
        d = "他人";
    }
    else if(path == "emotionHealth"){
        a = "幸福";
        b = "不幸福";
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

var dictionary = {
        "我的" : 68,
		"自己" : 68,
		"咱" : 68,
		"俺" : 68,
		"他" : 75,
		"他人" : 75,
		"别人" : 75,
		"他们的" : 75,
        "高兴" : 68,
		"满足" : 68,
		"愉快" : 68,
		"乐观" : 68,
		"充实" : 68,
		"烦恼" : 75,
		"焦虑" : 75,
		"悲伤" : 75,
		"抑郁" : 75,
		"沮丧" : 75,
        "空气清新" : 68,
		"能见度高" : 68,
		"呼吸顺畅" : 68,
		"舒适宜人" : 68,
		"汽车尾气" : 75,
		"可吸入颗粒物" : 75,
		"上呼吸道感染" : 75,
		"支气管哮喘" : 75
}
var _dictionary = {
        "我的" : 75,
		"自己" : 75,
		"咱" : 75,
		"俺" : 75,
		"他" : 68,
		"他人" : 68,
		"别人" : 68,
		"他们的" : 68,
        "高兴" : 68,
		"满足" : 68,
		"愉快" : 68,
		"乐观" : 68,
		"充实" : 68,
		"烦恼" : 75,
		"焦虑" : 75,
		"悲伤" : 75,
		"抑郁" : 75,
		"沮丧" : 75,
        "空气清新" : 75,
		"能见度高" : 75,
		"呼吸顺畅" : 75,
		"舒适宜人" : 75,
		"汽车尾气" : 68,
		"可吸入颗粒物" : 68,
		"上呼吸道感染" : 68,
		"支气管哮喘" : 68
}
function judge(bool, word, key) {
    var reasult;
    if(bool){
        if(_dictionary[word] == key){
            reasult = 1;
        }
        else{
            reasult = 0;
        }
    }
    else{
        if(dictionary[word] == key){
            reasult = 1;
        }
        else{
            reasult = 0;
        }
    }
    return reasult;
}
