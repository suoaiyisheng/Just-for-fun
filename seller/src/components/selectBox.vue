<template>
  <div class="selectBoxWrapper">
    <h2>{{checkBoxData.type}}</h2>
    <label>
      <input
        type="checkbox"
        id="selectAll"
        value="全选"
        v-model="toggle"
        true-value="yes"
        false-value="no"
        @click="selectAll"
      />全选
    </label>
    <template v-for="checkbox in checkBoxData.data">
      <input
        type="checkbox"
        v-bind:id="checkbox.id"
        v-bind:value="checkbox.value"
        v-model="checkedItems"
        v-bind:key= "checkbox.id"
      />
      <label for="checkbox.id" v-bind:key="checkbox.value">{{ checkbox.value }}</label>
    </template>
  </div>
</template>

<script>

  export default {
    name:'',
    props:{checkBoxData:Object},
    data () {
      return {
          toggle: "no",
          checkedItems: [],
      }
    },

    created() {
        this.checkBoxNum = this.checkBoxData.data.length;
    },

    watch: {
        checkedItems: function() {
        if (this.checkedItems.length == this.checkBoxNum) {
            if (this.toggle == "no") {
            this.toggle = "yes";
            }
        } else {
            if (this.toggle == "yes") {
            this.toggle = "no";
            }
        }
        this.$emit('selectChange', JSON.stringify(this.checkedItems));
        }
    },

    methods: {
        selectAll: function() {
        if (this.toggle == "yes") {
            this.toggle = "no";
            this.checkedItems = [];
        } else {
            this.toggle = "yes";
            this.checkBoxData.data.forEach(checkBox => {
            if (this.checkedItems.indexOf(checkBox.value) == -1) {
                this.checkedItems.push(checkBox.value);
            }
            });
        }
        }
    }
    
  }

</script>
<style lang='' scoped>

</style>