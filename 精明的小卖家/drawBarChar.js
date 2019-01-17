var barCharData ={
    dataset : null,
    dataXtext : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
    xAxisWidth : 300,
    yAxisWidth : 300,
    width : 340,
    height : 340,
    padding : { top:20,right:20,bottom:20,left:20}
}
var barCharOctopus = {
    getDataset : function () {
        return barCharData.dataset.sale;
    },
    setSoureData : function (arr) {
        barCharData.dataset = arr[0];
    },
    getDataXtext : function () {
        return barCharData.dataXtext;
    },
    getxAxisWidth : function () {
        return barCharData.xAxisWidth;
    },
    getyAxisWidth : function () {
        return barCharData.yAxisWidth;
    },
    getWidth : function () {
        return barCharData.width;
    },
    getHeight : function () {
        return barCharData.height;
    },
    getpadding : function () {
        return barCharData.padding
    }
}
var barChartview = {
    width : barCharOctopus.getWidth(),
    height : barCharOctopus.getHeight(),
    padding : barCharOctopus.getpadding(),
    init : function () {
        if(!this.svg){
            this.svg =  d3.select('.barCharWrapper')
            .append('svg')
            .attr('width',this.width)
            .attr('height',this.height)
        };
        this.dataset = barCharOctopus.getDataset();
        this.dataXtext = barCharOctopus.getDataXtext();
        this.xAxisWidth = barCharOctopus.getxAxisWidth();
        this.yAxisWidth = barCharOctopus.getyAxisWidth();
        this.xScale = d3.scaleBand()
                        .domain(d3.range(this.dataset.length))
                        .rangeRound([0,this.xAxisWidth])
                        .paddingInner(0.2)
                        .paddingOuter(0.2)
        this.yScale = d3.scaleLinear()
                .domain([0,d3.max(this.dataset)])
                .range([0,this.yAxisWidth]);
        },
    render : function () {
        this.init();
        this.drawBar();
        this.drawAxis();
    },
    drawBar : function () {
        var dataset = this.dataset,
            xScale = this.xScale;
            yScale = this.yScale,
            padding = this.padding,
            svg = this.svg,
            height = this.height;
            yAxisWidth = this.yAxisWidth;
        var rect = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .on("mouseover",function(d,i){
            var maskWrapper = d3.select(this)
                                .select('.rectMaskWrapper');
               maskWrapper.classed('none',!maskWrapper.classed('none'))
          })
        .on("mouseout",function(d,i){
            var maskWrapper = d3.select(this)
                                .select('.rectMaskWrapper');
               maskWrapper.classed('none',!maskWrapper.classed('none'))
          })
        .append('rect')
        .attr('fill','#ff8162')
        .attr('x',function (d,i) {
          return padding.left + xScale(i);
          })
        .attr('y',function (d) {
          return height - padding.bottom - yScale(d);
        })
        .attr('width',xScale.bandwidth)
        .attr('height',function (d) {
          return yScale(d);
        })
        var rectMaskWrapper = svg.selectAll('g')
                        .append('g')
                        .attr('class','none rectMaskWrapper');
        var rectMask =rectMaskWrapper.append('rect')
                            .attr('fill','rgba(239,240,241,0.5)')
                            .attr('x',function (d,i) {
                                return padding.left + xScale(i);
                                })
                            .attr('y',padding.top)
                            .attr('width',xScale.bandwidth)
                            .attr('height',yAxisWidth)
        var rectMaskText = rectMaskWrapper.append('text')
                            .attr("fill","#ffefe0")
                            .attr("font-size","12px")
                            .attr("text-anchor","middle")//默认情况是end
                            .attr("x",function (d,i) {
                                return padding.left + xScale(i);
                            })
                            .attr("y",padding.top)
                            .attr("dy",'1em')
                            .attr("dx",xScale.bandwidth()/2)
                            .text(function (d) {
                                return d;
                            });
    },
    drawAxis : function () {
        var svg = this.svg,
            xScale = this.xScale,
            yScale = this.yScale,
            yAxisWidth = this.yAxisWidth,
            padding = this.padding,
            dataXtext = this.dataXtext;
        var xAxis = d3.axisBottom(xScale);
        yScale.range([yAxisWidth,0]);
        var yAxis = d3.axisRight(yScale);
        svg.append('g')
           .attr("class","axis xAxis")
           .attr("transform","translate("+padding.left+","+(height - padding.bottom) +")")
           .call(xAxis);
        svg.append('g')
           .attr("class","axis yAxis")
           .attr("transform","translate("+padding.left+"," + padding.top + ")" )
           .call(yAxis);
        svg.select('.yAxis')
           .selectAll('text')
           .attr('dx','-3em');
        d3.select('.xAxis')
          .selectAll('text')
          .data(dataXtext)
          .text(function (d) {
              return d 
          })
    }
}