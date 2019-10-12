// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import moment from 'moment';
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

import common from "./common/common.js"

// mock
// import './mock'  

import bootstrap from './core/bootstrap'
import './core/use'
// import './permission' // permission control
import './utils/filter' // global filter

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.path === '/user/login') {
    window.localStorage.removeItem("pro__Access-Token");
    window.localStorage.removeItem("user");
    // window.localStorage.removeItem("pro__DEFAULT_COLOR");
  }

  
  // let user = JSON.parse(sessionStorage.getItem('username'));
// console.log(sessionStorage.getItem('username'))
  let token = window.localStorage.getItem("pro__Access-Token");
 
  if(!token && to.path !== '/user/login') {
    // debugger;
    next({ path: '/user/login' });
  } else {
    next()
  }
})



router.beforeEach((to, from, next) => {
  let token = window.localStorage.getItem("pro__Access-Token");

  if(token && to.path === '/dashboard/content') {
    let user = window.localStorage.getItem("user");
    const users = JSON.parse(user)
    if(users.type==2){
      next();
    }
    else{
      next()
    }
    // window.localStorage.removeItem("pro__DEFAULT_COLOR");
  }
  else{
    next()
  }

})




// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(common)
new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
