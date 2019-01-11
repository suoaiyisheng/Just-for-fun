var postfixList = ['@163.com', '@gmail.com', '@126.com', '@qq.com', '@263.net'];
var inputDom = document.querySelector('input');
var ul = document.querySelector('#email-sug-wrapper');
inputDom.oninput = function() {
    var userIpt = getIpt();
    controlShow(userIpt);
}
ul.onclick = function (e) {
    if( e.target.tagName == 'LI'){
        inputDom.value = e.target.innerText;
        this.classList.add('none');
    }
}
function getIpt() {
    var content = inputDom.value;
    return content.trim();
}

function createTipContent() {
    var content = getIpt(),
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
    postfixList.forEach(element => {
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
}

function creteTipLi(arr) {
    var li = null;
    ul.innerHTML = '';
    arr.forEach(element => {
        li = document.createElement('li');
        li.innerText = element;
        ul.appendChild(li);
    });
}
//innerHTML&innerText
function controlShow(userIpt) {
    var tipContent = createTipContent( userIpt );
    if (userIpt.length != 0) {
        creteTipLi(tipContent);
        show();
    } else {
        none();
    }
}

function show() {
    ul.classList.remove("none");
}

function none() {
    ul.classList.add("none");
}