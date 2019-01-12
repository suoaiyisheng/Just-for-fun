var data ={
    selectProduct : null,
    selectRegion : null,
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
    setProduct : function ( value ) {
        data.selectProduct = value;
    },
    setRegion : function ( value ) {
        data.selectRegion = value;
    },
    selectData : function () {
        var arr = [],
            selectProduct = data.selectProduct,
            selectRegion  = data.selectRegion;
        data.sourceData.forEach( element => {
            if(!selectProduct && selectRegion){
                if( element.region == selectRegion){
                    arr.push( element );
                }
            }else if(!selectRegion && selectProduct){
                if( element.product == selectProduct){
                    arr.push( element );
                }
            }else {
                if(element.region ==  selectRegion && element.product == selectProduct)
                    arr.push( element );
            }
        });
        return arr;
    }
}
var view = {
    init : function () {
        this.table = document.querySelector( '#table-wrapper' );
        this.regionRadio  = document.querySelectorAll( 'input[name="region"]' );
        this.productRadio = document.querySelectorAll('input[name="product"]');
        this.saleTemplate = document.querySelector('script[data-template="sale"]').innerHTML;
        this.regionRadio.forEach(element => {
            element.onchange = function () {
                var region = this.value;
                    octopus.setRegion( region );
                    view.render();
            }
        });
        this.productRadio.forEach(element => {
            element.onchange = function () {
                var product = this.value;
                    octopus.setProduct( product );
                    view.render();
            }
        });
    },
    render : function () {
        var saleTable = this.table,
            template  = this.saleTemplate;
            content = '',
            arr = octopus.selectData();
        arr.forEach(function(element){
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
                        trContent += "<td>" + element[key] + "</td>";
                    }
                }
            }
            trContent += "</tr>";
            content += trContent;
        });
        template = template.replace( /{{content}}/g,content);
        this.table.innerHTML = template;
    }
}
view.init();
