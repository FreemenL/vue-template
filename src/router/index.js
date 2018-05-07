import Vue from 'vue';
import Router from 'vue-router';
import Todo from '@component/Todo';
import HelloWorld from '@component/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      name: 'index',
      component: Todo
    },
    {
      path: '/demos',
      name: '案例',
      component: HelloWorld
    }
  ]
})