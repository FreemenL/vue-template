/*
* index.js
* 项目入口文件
* */
import Vue from 'vue';
import router from '@router';
import App from './App';
import store from "@store/modules.index";
// 引入全局CSS样式
// 
require('normalize.css');

import '@assets/styles/global.styl'
Vue.config.productionTip = false;
// 将根节点root注入到app.vue组件中
const root = document.getElementById('root');

window.rootVue = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount(root)

