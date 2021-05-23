import Vue from 'vue'
import App from './App.vue'
import VueAxios from "vue-axios";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
var numeral = require("numeral");
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});
Vue.filter("formatNumber", function (value) {
  return numeral(value).format("0,0"); 
});
new Vue({
  render: h => h(App),
}).$mount('#app')
