var data = {
    year : null,
    month : null,
    date : null,
    day : null,
    hour : null,
    minite : null,
    second : null,
    fromNowDays : null,
    fromNowHours : null,
    formNowMins : null,
    formNowSeconds : null
}
var octopus = {
    getPastTimeStr : function () {
        return data.year + "年" + this.standard(data.month+'') + "月" + this.standard(data.date+'') + "日星期" + data.day +'  '+ this.standard(data.hour+'') + ':' + this.standard(data.minite+'') + ':' + this.standard(data.second+'');
    },//!!!!!巨微妙的细节之！new Date 中月的部分！一定是从0开始的，所以这里传入的值要 -1；
    setNowTime : function (year,month,date,hour,minite,second) {
        data.year = year;
        data.month = month -1;
        data.date = date;
        data.hour = hour;
        data.minite = minite;
        data.second = second;
        data.day = this.getPastTime().getDay();
    },
    getFromNowTime : function () {
        return data.fromNowDays +'天'+ data.fromNowHours + "小时" + data.formNowMins + "分" + data.formNowSeconds+"秒";
    },
    setFromNowTime : function () {
        var result = Math.abs(new Date() - octopus.getPastTime()),
        i,j,k;
        data.fromNowDays = parseInt(result/(1000*60*60*24));//天
        i = result - data.fromNowDays*(1000*60*60*24);//i为临时变量
        data.fromNowHours = parseInt(i/ (1000 * 60 * 60));//时
        j = i - data.fromNowHours * (1000 * 60 * 60);
        data.formNowMins = parseInt(j / (1000 * 60)); //分
        k = j - data.formNowMins * (1000 * 60 );
        data.formNowSeconds = parseInt(k /1000);
    },
    getPastTime : function () {
        var past = new Date(data.year,data.month,data.date,data.hour,data.minite,data.second);
        return past;
    },
    standard : function (str) {
        if(str.length == 1){
            return "0"+str;
        }else{
            return str;
        }
    },
}
var view = {
    init : function () {
        this.show = document.querySelector('#result-wrapper'),
        this.form = document.querySelector("#time-form"),
        this.yearSelect = document.querySelector('#year-select');
        this.monthSelect = document.querySelector("#month-select");
        this.daySelect = document.querySelector('#day-select');
        this.hourSelect = document.querySelector('#hour-select');
        this.miniteSelect = document.querySelector('#minite-select');
        this.secondSelect = document.querySelector('#second-select');
        this.yearOption = this.yearSelect.querySelectorAll('option');
        this.monthOption = this.monthSelect.querySelectorAll('option');
        this.dayOption = this.daySelect.querySelectorAll('option');
        this.hourOption = this.hourSelect.querySelectorAll('option');
        this.minOption = this.miniteSelect.querySelectorAll('option');
        this.secondOption = this.secondSelect.querySelectorAll('option');
        this.result = null;
        this.form.onchange = function () {
            clearInterval(this.id);
            octopus.setNowTime(view.yearOption[view.yearSelect["selectedIndex"]].value,
            view.monthOption[view.monthSelect["selectedIndex"]].value,
            view.dayOption[view.daySelect["selectedIndex"]].value,
            view.hourOption[view.hourSelect["selectedIndex"]].value,
            view.minOption[view.miniteSelect["selectedIndex"]].value,
            view.secondOption[view.secondSelect["selectedIndex"]].value);
            octopus.setFromNowTime();
            view.render();
            view.id = setInterval(function () {
                this.render();
            }.bind(view),1000);
            
        };
        //初始化
        octopus.setNowTime(view.yearOption[view.yearSelect["selectedIndex"]].value,
        view.monthOption[view.monthSelect["selectedIndex"]].value,
        view.dayOption[view.daySelect["selectedIndex"]].value,
        view.hourOption[view.hourSelect["selectedIndex"]].value,
        view.minOption[view.miniteSelect["selectedIndex"]].value,
        view.secondOption[view.secondSelect["selectedIndex"]].value);
        octopus.setFromNowTime();
        this.render();
        this.id = setInterval(function () {
            this.render();
        }.bind(view),1000);

    },
    render : function () {
        view.result = "现在距离" + octopus.getPastTimeStr();
        octopus.setFromNowTime();
        if(octopus.getPastTime() < new Date()){
            view.result += "已经过去"+ octopus.getFromNowTime()+"了噢~";
        }else{
            view.result += "还有"+ octopus.getFromNowTime();
        }
        view.show.innerText = view.result;
    },
}
view.init();