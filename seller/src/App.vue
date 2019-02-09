<template>
  <div id="app">
    <div id="select">
      <select-box v-bind:checkBoxData="selectRegion" v-on:selectChange="getSelectRegion"></select-box>
      <select-box v-bind:checkBoxData="selectProduct" v-on:selectChange="getSelectProduct"></select-box>
    </div>
    <div id="tableWrapper">
      <show-table v-bind:tableData="selectSourceData" v-bind:selectProductNum="checkedProduct.length" v-bind:selectRegionNum="checkedRegion.length"></show-table>
    </div>
  </div>
</template>

<script>
import selectBox from "./components/selectBox";
import showTable from "./components/showTable";

export default {
  name: "app",
  components: {
    selectBox,
    showTable
  },
  data() {
    return {
      selectRegion:{
        type: "地区",
        data: [
              {
                id: "east",
                value: "华东"
              },
              {
                id: "north",
                value: "华北"
              },
              {
                id: "south",
                value: "华南"
              }
            ]
      },
      selectProduct:{
        type: "产品",
        data: [
          {
            id: "phone",
            value: "手机"
          },
          {
            id: "Laptop",
            value: "笔记本"
          },
          {
            id: "Audio",
            value: "智能音箱"
          }
        ]
      },
      checkedRegion: [],
      checkedProduct: [],
      sourceData: [{
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
      }],
      selectSourceData:[]
    }
  },
  methods: {
    getSelectRegion:function (newValue) {
      this.checkedRegion = newValue;
    },
    getSelectProduct:function (newValue) {
      this.checkedProduct = newValue;
    },
    selectData:function (selectProduct,selectRegion,sourceData) {
      var conditions = [],
      selectProductNum = selectProduct.length,
      selectRegionNum = selectRegion.length,
      arr = [];
      for (var productIndex = 0;productIndex < selectProductNum;productIndex++) {
        for (var regionIndex = 0; regionIndex < selectRegionNum; regionIndex++) {
          var variable = [];
          variable.push(selectProduct[productIndex]);
          variable.push(selectRegion[regionIndex]);
          conditions.push(variable);
        }
      }
      conditions.forEach(condition => {
        sourceData.forEach(element => {
          if (element.product == condition[0] && element.region == condition[1]) {
            arr.push(element);
          }
        });
      });
      return arr;
      
    }
  },
  watch: {
    checkedRegion: function () {
      var sourceData = [],
          selectRegion = [],
          selectProduct = [];
      this.checkedProduct.forEach(element => {
          selectProduct.push(element);
      });
      this.checkedRegion.forEach(element => {
          selectRegion.push(element);
      });
      if(localStorage.getItem('sourceData')){
        sourceData = JSON.parse(localStorage.getItem('sourceData'));
      }else{
        sourceData = this.sourceData;
      }
      this.selectSourceData = this.selectData(selectProduct,selectRegion,sourceData);
    },
    checkedProduct: function () {
      var sourceData = [],
          selectRegion = [],
          selectProduct = [];
      this.checkedProduct.forEach(element => {
          selectProduct.push(element);
      });
      this.checkedRegion.forEach(element => {
          selectRegion.push(element);
      });
      if(localStorage.getItem('sourceData')){
        sourceData = localStorage.getItem('YourItem');
      }else{
        sourceData = this.sourceData;
      }
      this.selectSourceData = this.selectData(selectProduct,selectRegion,sourceData);
    }
  },
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
