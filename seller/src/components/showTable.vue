<template>
    <table id="myTable">
        <thead>
        <tr>
            <th>{{firstTrName}}</th>
            <th>{{secondTrName}}</th>
            <th>1月</th>
            <th>2月</th>
            <th>3月</th>
            <th>4月</th>
            <th>5月</th>
            <th>6月</th>
            <th>7月</th>
            <th>8月</th>
            <th>9月</th>
            <th>10月</th>
            <th>11月</th>
            <th>12月</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(dataItem,index) in data" v-bind:key="index">
                <template v-if="selectProductNum == selectRegionNum && selectProductNum ==1">
                    <td>{{dataItem.product}}</td>
                    <td>{{dataItem.region}}</td>
                </template>
                <template v-else-if="selectRegionNum > selectProductNum">
                    <td v-if="index % 3 == 0" :rowspan="selectRegionNum">{{dataItem.product}}</td>
                    <td>{{dataItem.region}}</td>
                </template>
                <template v-else-if="selectProductNum >= selectRegionNum && selectProductNum>1">
                    <td v-if="index % 3 == 0" :rowspan="selectProductNum">{{dataItem.region}}</td>
                    <td>{{dataItem.product}}</td>
                </template>
                <td v-for="(item,index) in dataItem.saleTd" v-bind:key="index">
                    <span v-show="item.tdTab === 'editting'">
                    <input v-model="dataItem.saleTd[index].saleNum" @keyup.enter="setEdited(item)">
                    <i class=" icon-checkmark" @click="setEdited(item)"></i>
                    <i class="icon-cross" @click="setEdited(item)"></i>
                    </span>
                    <span v-show="item.tdTab === 'edited'" class="edited">
                    <span>{{item.saleNum}}</span>
                    <i class="icon-pencil none editBtn" @click="setEditting(item)"></i>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>

export default {
    name:'showTable',

    props:{
        tableData: Array,
        selectProductNum: Number,
        selectRegionNum: Number,
    },

    data () {
        return {
            secondTrName: '',
            firstTrName: '',
            data: [],
            storeData: []
        };
    },

    methods: {
        saleTdObj: function (saleNum) {
            var obj = {};
            obj.saleNum = saleNum;
            obj.tdTab = "edited";
            return obj
        },
        setEdited: function (saleTdObj) {
            saleTdObj.tdTab = "edited";
            this.renderStoreData();
            localStorage.setItem('sourceData', this.storeData)
        },
        setEditting: function (saleTdObj) {
            saleTdObj.tdTab = "editting";
        },
        renderData: function () {
            this.data = [];
            this.tableData.forEach(element => {
                var obj = {};
                    obj.product = element.product;
                    obj.region = element.region;
                    obj.saleTd = [];
                    element.sale.forEach(item => {
                        obj.saleTd.push(new this.saleTdObj(item))
                    })
                    this.data.push(obj)
            });
            console.log(this.data);
            //表头数据设置
            var selectProductNum = this.selectProductNum,
                selectRegionNum = this.selectRegionNum;
            if( selectRegionNum > selectProductNum){
                this.firstTrName = '产品',
                this.secondTrName = '地区'         
            }else {
                this.firstTrName = '地区',
                this.secondTrName = '产品';
            }
        },
        renderStoreData : function () {
            this.storeData = [],
            this.data.forEach(element => {
                    var obj = {};
                    obj.product = element.product;
                    obj.region = element.region;
                    obj.sale = [];
                    element.saleTd.forEach(item => {
                        obj.sale.push(item.saleNum)
                    })
                    this.storeData.push(obj)
            })
        }
    },

    watch: {
        tableData:function () {
            this.renderData();
        }
    },
    }

</script>
<style lang='stylus' scoped>
#myTable
    .edited:hover
        .editBtn
            display inline-block
.none
    display none
</style>