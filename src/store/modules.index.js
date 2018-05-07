import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const component=require.context('./modules/',true,/\.js$/);

let modules={};
component.keys().forEach(key=>{
  let defines=component(key).default;
  defines.module.namespaced=true;
  modules[defines.name]=defines.module;
})
window.vuexStore=new Vuex.Store({modules});
export default window.vuexStore;