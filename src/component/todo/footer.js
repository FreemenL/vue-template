import '@assets/styles/footer.styl';
import Vue from 'vue';
import Component from 'vue-class-component';
import { bridge } from 'libs/jssdk';
@Component({
  props: {
    demos: String,
  }
})
class Footer extends Vue{
    handleClick(){
      bridge.makeCall('0871-67159980');
      console.log(bridge);
    }
    render(){
        return(
          <div id="footer">
              <br/>
              <span>Hosted by Coding Pages</span>
              <span onClick={this.handleClick.bind(this)}>点击测试</span>
          </div>
        )
    }
}
export default Footer;