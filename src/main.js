import Vue from 'vue'
import App from './App.vue';
import VueAxios from "vue-axios";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
import store from './store'


Vue.config.productionTip = false
Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
});

new Vue({
  store,
  render: h => h(App), 
}).$mount('#app')
