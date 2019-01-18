var data = {
    selectProduct : {
        type : 'product',
        typeText : '产品',
        value : []
    },
    selectRegion : {
        type : 'region',
        typeText : '地区',
        value : ['华东']
    },
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
var tableOctopus = {
    setSelectProduct : function () {
        var selectProduct = [],
            arr = productCheckBox.getSelectCheckbox();
        arr.forEach(element => {
            if(element.checked){
                selectProduct.push( element.value );
            }
        });
        data.selectProduct.value = selectProduct;
    },
    getSelectProduct : function () {
        return data.selectProduct;
    },
    setSelectRegion : function () {
        var selectRegion = [],
            arr = regionCheckBox.getSelectCheckbox();
        arr.forEach(element => {
            if(element.checked){
                selectRegion.push( element.value ); 
            }
        });
        data.selectRegion.value = selectRegion;
    },
    getSelectRegion : function () {
        return data.selectRegion;
    },
    selectData : function () {
        var conditions = [],
            selectProduct = data.selectProduct.value,
            selectRegion = data.selectRegion.value,
            selectProductNum = selectProduct.length,
            selectRegionNum = selectRegion.length,
            sourceData = data.sourceData,
            arr = [];
            for (var  productIndex = 0; productIndex < selectProductNum; productIndex++) {
                for (var  regionIndex = 0; regionIndex < selectRegionNum; regionIndex++) {
                    var variable = [];
                    variable.push(selectProduct[productIndex]);
                    variable.push(selectRegion[regionIndex]);
                    conditions.push( variable );
                }
            }
            conditions.forEach(condition => {
                sourceData.forEach(element => {
                    if(element.product == condition[0] && element.region == condition[1]){
                        arr.push( element );
                    }
                });
            });
        return arr;
    }
}
var tableView = {
    init : function () {
        this.table = document.querySelector( '#show-table' );
        this.template = document.querySelector("script[data-template = 'sale']").innerHTML;
        this.button = document.querySelector('#control');
        this.button.onclick = (function(){
        return  function () {
            //table部分的工作
                tableOctopus.setSelectRegion();
                tableOctopus.setSelectProduct();
                this.render();
            //barChart部分的工作
                var arr = tableOctopus.selectData();
                if(arr.length == 1){
                barCharOctopus.setSoureData(arr);
                barChartview.render();
                }else{
                    if(!document.querySelector('.barCharWrapper span').innerHTML){
                        document.querySelector('.barCharWrapper span').innerHTML += '<span>sorry!!!柱形图只提供单个服务！！！对不住了！！请看折线图</span>'
                    }else{
                        document.querySelector('.barCharWrapper svg').innerHTML = '';
                    }
                }
            //lineChart部分的工作
                lineChartOctopus.setSourData(arr);
                lineChartview.render();
            }.bind(tableView);
        })()
    },//初始化共同需要的零件部件+事件绑定
    render : function (arr) {
        this.selectProduct = tableOctopus.getSelectProduct();
        this.selectRegion = tableOctopus.getSelectRegion();
        var selectProductNum = this.selectProduct.value.length,
            selectRegionNum = this.selectRegion.value.length,
            arr = tableOctopus.selectData();
        if( selectProductNum > 1 && selectRegionNum == 1){
            this.renderCase1( arr,this.selectProduct,this.selectRegion);
        }else if( selectRegionNum >1 && selectProductNum ==1){
            this.renderCase1( arr,this.selectRegion,this.selectProduct);
        }else if( selectProductNum > 1 && selectRegionNum > 1){
            this.renderCase2(arr);
        }else{
            this.renderCase3(arr);
        }
        //绑定事件
        d3.selectAll('tbody>tr')
          .data(arr)
          .on("mouseover",function (d) {
              var newArr = [];
              newArr.push(d);
              barCharOctopus.setSoureData(newArr);
              barChartview.render();
              lineChartOctopus.setSourData(newArr);
              lineChartview.render();
              document.querySelector('.barCharWrapper span').innerHTML = '';
          })
          .on("mouseout",function (d) {
               if(arr.length == 1){
                    barCharOctopus.setSoureData(arr);
                    barChartview.render();
                }else{//恢复成原来的样子
                    if(!document.querySelector('.barCharWrapper span').innerHTML){
                        document.querySelector('.barCharWrapper span').innerHTML += '<span>sorry!!!柱形图只提供单个服务！！！对不住了！！请看折线图</span>'
                    }
                    document.querySelector('.barCharWrapper svg').innerHTML = '';
                }
            //lineChart部分的工作
                lineChartOctopus.setSourData(arr);
                lineChartview.render();
          })
    },//路由控制渲染
    renderCase1 : function render(arr,winSelect,loserSelect) {
        var content = '';
            flag = 0,
            template = tableView.template,
            table = tableView.table;
        template = template.replace(/{{thead-firstTd-content}}/g,winSelect.typeText);
        template = template.replace(/{{thead-secondTd-content}}/g,loserSelect.typeText);
        arr.forEach(function(element){
            var trContent = "<tr>",
                tdContent;
            if( flag == 0){
                trContent += "<td "+ "rowspan='" +arr.length + "' >" + element[winSelect.type] + "</td>";
                flag = 1;
            }
            trContent += "<td>" + element[loserSelect.type] + "</td>";
            element["sale"].forEach(a => {
                tdContent = "<td>" + a + "</td>";
                trContent += tdContent;
            });
            trContent += "</tr>";
            content += trContent;
    });
    template = template.replace( /{{content}}/g,content);
    table.innerHTML = template;
    },//3V1的情况
    renderCase2 :  function(arr){
            var classifyArr = tableView.classify( arr ),
                content = '',
                template = this.template,
                table = this.table;
            template = template.replace(/{{thead-firstTd-content}}/g,"产品");
            template = template.replace(/{{thead-secondTd-content}}/g,"地区");
            classifyArr.forEach(classifyItem => {
                 var flag = 0;
                 classifyItem.forEach(function(element){
                     var trContent = "<tr>",
                         tdContent;
                     for (var key in element) {
                         if (element.hasOwnProperty(key)) {
                             if( element[key].constructor == Array ){
                                 element[key].forEach(a => {
                                     tdContent = "<td>" + a + "</td>";
                                     trContent += tdContent;
                                 });
                             }else{
                                 if( key == "product"){
                                     if( flag == 0){
                                         trContent += "<td "+ "rowspan='" + classifyItem.length + "' >" + element[key] + "</td>";
                                         flag = 1;
                                     }
                                 }
                                 else{
                                     trContent += "<td>" + element[key] + "</td>";
                                 }
                             }
                         }
                     }
                     trContent += "</tr>";
                     content += trContent;
             });
            });
            template = template.replace( /{{content}}/g,content);
            table.innerHTML = template;
    },//多VS多
    renderCase3 : function (arr) {
            var content = '',
                templateCopy = tableView.template,
                table = tableView.table;
            arr.forEach(function(element){
                var trContent = "<tr>",
                    tdContent;
                templateCopy = templateCopy.replace(/{{thead-firstTd-content}}/g,"产品");
                templateCopy = templateCopy.replace(/{{thead-secondTd-content}}/g,"地区");
                for (var key in element) {
                    if (element.hasOwnProperty(key)) {
                        if( element[key].constructor == Array ){
                            element[key].forEach(a => {
                                tdContent = "<td>" + a + "</td>";
                                trContent += tdContent;
                            });
                        }else{
                            trContent += "<td>" + element[key] + "</td>";
                        }
                    }
                }
                trContent += "</tr>";
                content += trContent;
            });
            templateCopy = templateCopy.replace( /{{content}}/g,content);
            table.innerHTML = templateCopy;
    },//1v1
    classify : function (arr) {
        var visited = [],
            classifyArr = [],
            flag;
        for (var index = 0; index < arr.length; index++) {
            visited[ index ] = 0;
        };
        flag = visited.indexOf(0);
        for (var index = 0; index < arr.length && flag!=-1; index++) {
              var variable = [],
                  product = arr[index].product;
            for (var innerIndex = 0; innerIndex < arr.length && flag!=-1; innerIndex++) {
                if( arr[innerIndex].product == product && visited[innerIndex]==0){
                    variable.push( arr[innerIndex] );
                    visited[innerIndex] = 1;
                    flag = visited.indexOf(0);
                }
            }
            classifyArr.push( variable );
        }
        return classifyArr;
    }
}
tableView.init();