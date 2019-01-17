var checkbox = {
    wrapper : null,
    checkboxData : null,
    selectType : null,
    tipText : null,
    template : document.querySelector('script[data-template="checkbox"]').innerHTML,
    init : function (wrapper,checkboxData,selectType,tipText) {
        this.wrapper = wrapper;
        this.checkboxData = checkboxData;
        this.selectType = selectType;
        this.tipText = tipText;
    },
    set : function () {
        var content = "<label "+ "for='"+ this.selectType + "'>" + this.tipText + "</label><br>",
            iptContent;
        this.checkboxData.forEach(element => {
            iptContent = this.template.replace(/{{selectType}}/g,this.selectType);
            iptContent = iptContent.replace(/{{value}}/g,element.value);
            iptContent = iptContent.replace(/{{checkboxType}}/g,element.checkboxType); 
            content += iptContent;
        });
        this.wrapper.innerHTML = content;
        this.subItemCheckbox = this.wrapper.querySelectorAll('input[checkbox-type="subItem"]');
        this.subItemCheckbox[0].checked = true;
        this.selectAllCheckbox = this.wrapper.querySelector('input[checkbox-type="all"]');
        this.wrapper.onchange = function (e) {
            var selctCheckBox = this.getSelectCheckbox(),
                checkbox = this.subItemCheckbox,
                selectAllCheckbox = this.selectAllCheckbox;
            switch (e.target.getAttribute("checkbox-type")) {
                case 'all':
                        if( selctCheckBox.length != checkbox.length){
                            checkbox.forEach(element => {
                                if(!element.checked){
                                    element.checked = true;
                                }
                            });
                        }else{
                            selectAllCheckbox.checked = true;
                            alert("您已经全选了不可以取消全选");
                        }
                break;
                case 'subItem':
                    if( selctCheckBox.length == 0){
                        //e.preventDefault();为什么不起作用
                        alert("至少选择一个表单项");
                        e.target.checked = 1;
                    }else if( selctCheckBox.length == checkbox.length){
                        selectAllCheckbox.checked = true;
                    }else{
                        selectAllCheckbox.checked = false;
                    }
                break;
            }
        }.bind( this );
    },
    getSelectCheckbox : function () {
        var selctCheckBox = [];
        this.subItemCheckbox.forEach(element => {
            if(element.checked ){
                selctCheckBox.push( element );
            }
        });
        return selctCheckBox;
    }
}
var regionWrapper = document.querySelector( "#region-checkbox-wrapper" ),
    regionCheckBox = Object.create( checkbox ),
    productWrapper = document.querySelector( "#product-checkbox-wrapper" ),
    productCheckBox = Object.create( checkbox );
    regionCheckBox.init(regionWrapper,[{
            value : "全选",
            checkboxType : 'all'
        },{
            value : "华东",
            checkboxType : "subItem"
        },{
            value : "华北",
            checkboxType : "subItem"
        },{
            value : "华南",
            checkboxType : "subItem"
        }],"region","请选择合适地区值");
        productCheckBox.init(productWrapper,[{
            value : "全选",
            checkboxType : 'all'
        },{
            value : "手机",
            checkboxType : 'subItem'
        },{
            value : '智能音箱',
            checkboxType : 'subItem'
        },{
            value : '笔记本',
            checkboxType : 'subItem'
        }],"product","请选择合适产品值")
    regionCheckBox.set();
    productCheckBox.set();
