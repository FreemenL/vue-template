import wx from 'weixin-js-sdk'
const ua = navigator.userAgent.toLowerCase();  
const isWx = ua.indexOf('micromessenger') > -1;
export const bridge = {
	ready(){
		return new Promise((res)=>{
			wx.ready(res)
		})
	},
	error(){
		return new Promise((res)=>{
			wx.error(res)
		})
	},
	closeWindow(){
		bridge.config();
		isWx? wx.closeWindow(): window.close();
	},
	makeCall(phone){
		location.href = `tel://${phone}`;
	},
	changeTitle(title){
		if( !title ){
			return;
		}
		document.title = title;
	},
	redirect(url){
		location.href = url;
	},
	config(){
		let config;
		try{
			let windowNameInfo = JSON.parse(window.name);
			config = {
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: windowNameInfo.appid, // 必填，公众号的唯一标识
				timestamp: windowNameInfo.timestamp, // 必填，生成签名的时间戳
				nonceStr: windowNameInfo.nonceStr, // 必填，生成签名的随机串
				signature: windowNameInfo.signature,// 必填，签名，见附录1
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'closeWindow'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			}
			wx.config(config);
		}catch(e){

		}
	},
	async onMenuShareTimeline({
		title = '', // 分享标题
		link = '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl = '', // 分享图标
		success = () => {}
	}){
		bridge.config();
		await bridge.ready();
		wx.onMenuShareTimeline({
			title,
			link,
			imgUrl,
			success
		})
	},
	async onMenuShareAppMessage({
		title = '', // 分享标题
		link = '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		imgUrl = '', // 分享图标
		success = () => {}
	}){
		bridge.config();
		await bridge.ready();
		wx.onMenuShareAppMessage({
			title,
			desc: title,
			link,
			imgUrl,
			success
		})
	}
}