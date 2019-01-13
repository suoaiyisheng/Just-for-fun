var data = {
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
var octopus = {
    setSelectProduct : function () {
        var selectProduct = [],
            arr = productCheckBox.getSelectCheckbox();
        arr.forEach(element => {
            selectProduct.push( element.value );
        });
        data.selectProduct = selectProduct;
    },
    setSelectRegion : function () {
        var selectRegion = [],
            arr = regionCheckBox.getSelectCheckbox();
        arr.forEach(element => {
           selectRegion.push( element.value ); 
        });
        data.selectRegion = selectRegion;
    },
    selectData : function () {
        var conditions = [],
            selectProduct = data.selectProduct,
            selectRegion = data.selectRegion,
            sourceData = data.sourceData,
            arr = [];
        for (var  productIndex = 0; productIndex < selectProduct.length; productIndex++) {
            for (var  regionIndex = 0; regionIndex < selectRegion.length; regionIndex++) {
                var variable = [];
                variable.push(selectProduct[productIndex].value);
                variable.push(selectRegion[regionIndex].value);
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
var view = {
    init : function () {
        
    },
    render : function () {
        
    }
}