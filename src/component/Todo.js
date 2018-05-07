import '@assets/styles/app.less';
import Vue from 'vue';
import Component from 'vue-class-component';
import APP_Header from '@component/todo/header.vue';
import APP_Footer from '@component/todo/footer.js';
import APP_Todo from '@component/todo/todo.vue';

@Component
class App extends Vue{
    constructor(props){
      super(props);
      this.state={
        name:'qqqq',
      }
    }
    data(){
      return {
        author: 'itPoet',
        blog: 'itPoet.cn'
      }
    }
    handleClick(){
      alert("123123")
    }
    render(){
        return (
          <div id="app">
            <div id="cover"></div>
            <APP_Header></APP_Header>
            <APP_Todo></APP_Todo>
            <APP_Footer demos={'qweqwe'}></APP_Footer>
          </div>
        )
    }
}
export default App;
