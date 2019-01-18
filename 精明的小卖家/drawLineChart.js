var drawLineData = {
    width: 300,
    height: 300,
    soureData : []
}
var lineChartOctopus = {
    getWidth : function () {
        return drawLineData.width
    },
    getHeight : function () {
        return drawLineData.height
    },
    setSourData : function (arr) {
        drawLineData.soureData = arr;
    },
    getDataSet : function getDataSet() {
                        var arr = drawLineData.soureData,
                            newArr,
                            saleArr,
                            item;
                        newArr = JSON.parse(JSON.stringify(arr));
                        for (var index = 0; index < newArr.length; index++) {
                                saleArr = newArr[index].sale;
                                saleArr.forEach((element,index)=> {
                                        item = [];
                                        item.push( index+1 );
                                        item.push(element);
                                        saleArr[index] = item;
                                    });               
                        }
                            return newArr;
                },
    getMax : function getMax() {
                var max = d3.max( drawLineData.soureData[0].sale),
                    num;
                    drawLineData.soureData.forEach(element => {
                    num = d3.max(element.sale);
                    if( num > max){
                        max = num
                    }
                });
                return max;
               }
}
var lineChartview = {
        width : lineChartOctopus.getWidth(),
        height : lineChartOctopus.getHeight(),
        padding : {
            top : 20,
            right : 20,
            bottom : 20,
            left: 20
        },
        init : function () {
        if(!this.svg){
            this.svg =  d3.select(".lineCharWrapper")
            .append("svg")			
            .attr("width", this.width)	
            .attr("height", this.height+50)
            .style("padding","20px");
        }
        this.max = lineChartOctopus.getMax();
        this.dataset = lineChartOctopus.getDataSet();
        this.xScale = d3.scaleLinear()
                        .domain([1,12])
                        .range([ 10 , this.width - this.padding.left - this.padding.right ]);
        this.yScale = d3.scaleLinear()
                        .domain([0,this.max * 1.1])
                        .range([ this.height - this.padding.top - this.padding.bottom , 0 ]);
        var xScale = this.xScale,
            yScale = this.yScale;
        this.linePath =   d3.line()
                            .x(function(d){ return xScale(d[0]); })
                            .y(function(d){ return yScale(d[1]); })
                            .curve(d3.curveBasis);
    },
    render: function () {
        this.init();
        this.drawLine();
        this.drawAxis();
    },
    drawAxis : function () {
        var xScale = this.xScale,
            yScale = this.yScale,
            padding = this.padding,
            svg = this.svg,
            height = this.height;
        var xAxis = d3.axisBottom(xScale)
                      .tickFormat(function (d) {
                          return d+"月"
                      })
        //y轴
        var yAxis = d3.axisLeft(yScale)
                        
        svg.append("g")
                .attr("class","axis")
                .attr("transform","translate(" + padding.left + "," + (height - padding.bottom) +  ")")
                .call(xAxis);
                    
        svg.append("g")
                .attr("class","axis")
                .attr("transform","translate(" + (padding.left+10 )+ "," + padding.top +  ")")
                .call(yAxis); 
        
    },
    drawLine : function () {
        var svg = this.svg,
            padding = this.padding,
            dataset = this.dataset,
            height = this.height,
            linePath = this.linePath,
            colors = [];
            if(svg.html()){
                svg.html('');
            }
            for (let index = 0; index < dataset.length; index++) {
                this.getColor(colors);
            }
            svg.selectAll("path")	
                .data(dataset)	
                .enter()			
                .append("path")		
                .attr("transform","translate(" + padding.left + "," +  padding.top  +")")
                .attr("d",function(d){
                    return linePath(d.sale);
                })	
                .attr("fill","none")
                .attr("stroke-width",3)
                .attr("stroke",function(d,i){
                    return colors[i];
                });
            var markStep = 20;
                
            var gMark = svg.selectAll(".gMark")
                            .data(dataset)
                            .enter()
                            .append("g")
                            .attr("transform",function(d,i){
                                return "translate(" + padding.left  + "," + ( height - padding.bottom  + i*markStep +20)  +")";
                            });
                
            gMark.append("rect")
                    .attr("x",0)
                    .attr("y",0)
                    .attr("width",10)
                    .attr("height",10)
                    .attr("fill",function(d,i){ return colors[i]; });

            gMark.append("text")
                    .attr("dy","0.8em")
                    .attr("dx","1em")
                    .attr("fill","black")
                    .style("font-size",'12px')
                    .text(function(d){ return d.region + '的' + d.product; });		

        },
        getColor : function (arr) {
            var blue = Math.round(Math.random()*255),
                red  = Math.round(Math.random()*255),
                green = Math.round(Math.random()*255);
            arr.push(d3.rgb(red,0,blue));
        }
}