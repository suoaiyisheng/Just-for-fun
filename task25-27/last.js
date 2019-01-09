var data = {
    year : null,
    month : null,
    date : null,
    day : null,
    hours : null,
    minutes : null,
    seconds : null,
    fromNowDays : null,
    fromNowHours : null,
    formNowMins : null,
    formNowSeconds : null
}
var octopus = {
    getYear : function () {
        return data.year;
    },
    setYear : function (value) {
        data.year = value;
    },
    getMonth : function () {
        return data.month+1;
    },
    setMonth : function (value) {
        data.month = value;
    },
    getDate : function () {
        return data.date;
    },
    setDate : function (value) {
        data.date = value;
    },
    getDay : function () {
        return data.day;
    },
    setDay : function (value) {
        data.day = value;
    },
    getHours : function () {
        return data.hours;
    },
    setHours : function (value) {
        data.hours = value;
    },
    getMinutes : function () {
        return data.minutes;
    },
    setMinutes : function (value) {
        data.minutes = value;
    },
    getSecond : function(){
        return data.seconds;
    },
    setSecond : function (value) {
        data.seconds = value;
    },
    getFromNowDay : function () {
        return data.fromNowDays;
    },
    getFromNowHours : function () {
        return data.fromNowHours;
    },
    getFromNowMinutes : function () {
        return data.formNowMins;
    },
    getFromNowSeconds : function () {
        return data.formNowSeconds;
    },
    setFromNowTime : function () {
        var result = new Date() - octopus.getPastTime(),
            i,j,k;
            data.fromNowDays = result/(1000*60*60*24);//天
            i = result % (1000*60*60*24);//i为临时变量
            data.fromNowHours = i/ (1000 * 60 * 60);//时
            j = i - i % (1000 * 60 * 60);
            data.formNowMins = j / (1000 * 60); //分
            k = j - j % (1000 * 60 * 60);
            data.formNowSeconds = k /1000;
    },
    getPastTime : function () {
        var past = new Date(this.getFullYear() + "," + this.getMonth() + "," + this.getDate() +"," + this.getHours() + "," + this.getMinutes() + this.getSecond());
        return past;
    }.bind(this)
}
var view = {
    init : function () {
        this.show = document.querySelector('#show'),
        this.form = document.querySelector("#time-form"),
        this.yearSelect = document.querySelector('#year-select');
        this.monthSelect = document.querySelector("#month-select");
        this.daySelect = document.querySelector('#day-select');
        this.hourSelect = document.querySelector('#hour-select');
        this.miniteSelect = document.querySelector('#minite-select');
        this.secondSelect = document.querySelector('#second-select');
        this.result = null;
        this.form.onchanged = function () {
            octopus.setYear(this.yearSelect[selectedIndex].value);
            octopus.setMonth(this.monthSelect[selectedIndex].value);
            octopus.setDay(this.daySelect[selectedIndex].value);
            octopus.setMinutes(this.miniteSelect[selectedIndex].value);
            octopus.setSecond(this.secondSelect[selectedIndex].value);
        }
        set
    },
    standard : function (str) {
        if(str.length == 1){
            return "0"+str;
        }else{
            return str;
        }
    },
    render : function () {
        this.result = "现在距离" + octopus.getYear() + "年" + view.standard(octopus.getMonth()+'') + "月" + view.standard(octopus.getDate()+'') + "日星期" + octopus.getDay() +'  '+ view.standard(octopus.getHours()+'') + ':' + view.standard(octopus.getMinutes()+'') + ':' + view.standard(octopus.getSecond()+'');
        this.result += "还有"+ octopus.getFromNowDay()+"天"+view.standard(octopus.getFromNowHours)+"小时"+view.standard()
    }
}
view.init();