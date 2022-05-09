import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
//add bootstrap
const bootstrap = require('bootstrap')
Vue.use(bootstrap)
