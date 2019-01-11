(function () {
    var data = {
        postfixList : ['@163.com', '@gmail.com', '@126.com', '@qq.com', '@263.net'],
        nowSelectTipIndex : 0,
        show : 0
    };
    var octopus = {
        getIptContent : function () {
            return data.iptContent;
        },
        setIptContent : function (content) {
            data.iptContent = content;
        },
        setNowSelectTipIndex : function (index) {
            data.nowSelectTipIndex = index;
        },
        getNowSelectTipIndex : function () {
            return data.nowSelectTipIndex;
        },
        getShow : function () {
            return data.show;
        },
        setShow : function(){
           data.show = data.show == 0?1:0;
        },
        getPostfixList : function () {
            return data.postfixList;
        }
    };
    var view = {
        init : function () {
            this.postfixList = ['@163.com', '@gmail.com', '@126.com', '@qq.com', '@263.net'];
            this.inputDom = document.querySelector('input');
            this.ul = document.querySelector('#email-sug-wrapper');
            this.lis;
            this.inputDom.oninput = function(e) {
                var userIpt = this.getIpt();
                this.renderTipBlock(userIpt);
            }.bind(view);
            this.inputDom.onkeydown = function (e) {
                switch(e.keyCode){
                    case 13:{
                        //enter
                        this.renderIpt();
                        octopus.setShow();
                        this.renderShow();
                        break;
                    };
                    case 38:{
                        //↑
                        //更新data中的nowSelectTipIndex
                        var index = ((octopus.getNowSelectTipIndex() -1) + this.lis.length) % this.lis.length;
                        if( octopus.getShow() && index >= 0){                      
                            this.renderSelect( index );
                        }
    
                        break;
                    };
                    case 40:{
                        //↓
                        //更新data中的nowSelectTipIndex
                        var index = ((octopus.getNowSelectTipIndex() +1) + this.lis.length) % this.lis.length;
                        if( octopus.getShow() && index < this.lis.length ){
                            this.renderSelect( index );
                        }
                        break;
                    };
                }
            }.bind(view),
            this.ul.onclick = function(e){
                if( e.target.tagName == 'LI'){
                    octopus.setNowSelectTipIndex( e.target.getAttribute('data-index'));
                    view.renderIpt();
                    octopus.setShow();
                    view.renderShow();
                    view.focus();
                }
            }
            window.onload = function () {
                view.focus();
            }
        },
        renderTipBlock : function (userIpt) {
            var tipContent = this.createTipContent( userIpt );
            if (userIpt.length != 0) {
                this.creteTipLi(tipContent);
                if( octopus.getShow() !=1 ){
                    octopus.setShow();
                }
            } else {
                octopus.setShow();
            };
            this.renderShow();
        },
        renderSelect : function (index) {
            view.clearSelect( octopus.getNowSelectTipIndex());
            octopus.setNowSelectTipIndex( index );
            view.addSelect( octopus.getNowSelectTipIndex());
        },
        renderIpt : function(){
            var lis = view.ul.querySelectorAll('li');
            view.inputDom.value = view.lis[octopus.getNowSelectTipIndex()].innerText;
        },
        renderShow : function () {
            if(octopus.getShow() ==1){
                this.show();
            }else{
                this.none();
            }
        },
        getIpt : function() {
            var content = this.inputDom.value;
            return content.trim();
        },
        createTipContent : function() {
            var content = this.getIpt(),
                tip = [],
                tip1 = [];
                str = null,
                prefix = null,
                regexp = null,
                flag = 0;
            if(content.indexOf('@') != -1){
                str = content.slice(0,content.indexOf('@'));
                prefix = content.slice( content.indexOf('@') );
                regexp = new RegExp("^" + prefix);
            }
            octopus.getPostfixList().forEach(element => {
                if( prefix ){
                    if(regexp.test(element)){
                        tip.push( content.slice(0,content.indexOf('@')) + element );
                        flag = 1;
                    }else{
                        tip1.push( content + element );
                    }
                }else{
                    flag = 1;
                    tip.push( content + element);
                }
            });
            if(flag == 0){
                return tip1;
            }else{
                return tip;
            }
        },
        creteTipLi : function (arr) {
            var li = null;
            this.ul.innerHTML = '';
            arr.forEach((element,index)=> {
                li = document.createElement('li');
                li.innerText = element;
                li.setAttribute("data-index",index);
                this.ul.appendChild(li);
            });
            octopus.setNowSelectTipIndex(0);
            this.lis = this.ul.querySelectorAll('li');
            this.renderSelect(0);
        },
        show : function show() {
            this.ul.classList.remove("none");
        },
        none : function none() {
            this.ul.classList.add("none");
        },
        addSelect : function (elementIndex) {
            var li = this.lis[elementIndex];
            li.classList.add( 'select');
        },
        clearSelect : function (elementIndex) {
            var li = this.lis[elementIndex];
            li.classList.remove( 'select' );
        },
        focus : function(){
            view.inputDom.focus();
        }
    }
    view.init();
})()
