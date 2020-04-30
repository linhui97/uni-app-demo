import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false

// 全局挂载封装的异步请求
Vue.prototype.request = request;

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
