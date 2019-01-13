(function () {
    var data ={
        selectProduct : [],
        selectRegion : [],
        sourceData : [{
            product: "手机",
            region: "华东",
            sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
        }, {
            product: "手机",
            region: "华北",
            sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
        }, {
            product: "手机",
            region: "华南",
            sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
        }, {
            product: "笔记本",
            region: "华东",
            sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
        }, {
            product: "笔记本",
            region: "华北",
            sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
        }, {
            product: "笔记本",
            region: "华南",
            sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
        }, {
            product: "智能音箱",
            region: "华东",
            sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
        }, {
            product: "智能音箱",
            region: "华北",
            sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
        }, {
            product: "智能音箱",
            region: "华南",
            sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
        }]
    }
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
            this.wrapper.onchange = function (e) {
                var checkbox = this.wrapper.querySelectorAll('input[checkbox-type="subItem"]'),
                    selectAllCheckBox = this.wrapper.querySelector('input[checkbox-type="all"]'),
                    selctCheckBox = [];
                checkbox.forEach(element => {
                    if(element.checked ){
                        selctCheckBox.push( element );
                    }
                });
                switch (e.target.getAttribute("checkbox-type")) {
                    case 'all':
                            if( selctCheckBox.length != checkbox.length){
                                checkbox.forEach(element => {
                                    if(!element.checked){
                                        element.checked = true;
                                    }
                                });
                            }else{
                                selectAllCheckBox.checked = true;
                                alert("您已经全选了不可以取消全选");
                            }
                    break;
                    case 'subItem':
                        if( selctCheckBox.length == 0){
                            //e.preventDefault();为什么不起作用
                            alert("至少选择一个表单项");
                            e.target.checked = 1;
                        }else if( selctCheckBox.length == checkbox.length){
                            selectAllCheckBox.checked = true;
                        }else{
                            selectAllCheckBox.checked = false;
                        }
                    break;
                }
            }.bind( this );
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
                value : "华中",
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
})();
