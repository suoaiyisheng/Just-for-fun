/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";

import '../public/stylus/font.styl'

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");