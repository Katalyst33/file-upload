import Vue from 'vue'
import App from './App.vue'
import router from './router/router'


import 'bulma/css/bulma.min.css';
import 'shred-bootstrap/css/utilities.css';

import NavBar from "./components/commons/NavBar";



Vue.component('NavBar', NavBar);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
