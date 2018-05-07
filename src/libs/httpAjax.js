import axios from "axios";
import jwtDecode from 'jwt-decode';
import createHashHistory  from 'history/createHashHistory';
const history = createHashHistory();
export default function httpAjax(method, url, data, config) {
	let _this = this;
	let promise = new Promise((resolve, reject) => {
		// 添加请求拦截器
		axios.interceptors.request.use(function (config) {
		    // 在发送请求之前做些什么
		    let token = util.cookieUtil.get('token');
		    if(typeof token=="string"){
		    	config.headers.Authorization = token;
		    }
		    return config;
		  }, function (error) {
		    // 对请求错误做些什么
		    console.log(error)
		    return Promise.reject(error);
		  });

		// 添加响应拦截器
		axios.interceptors.response.use(function (response) {
		    // 对响应数据做点什么
		    return response;
		  }, function (error) {
		    // 对响应错误做点什么
		    return Promise.reject(error);
		  });
		axios[method](url, data, config)
			.then(result => {
					// 后台请求返回的code=0是操作成功
					if (result.data.code === 0||!result.data.code) {
						// console.log(jwtDecode(result.data.data.token));
						if(result.data.data){
							typeof result.data.data.token=="string"&&util.cookieUtil.set('token',result.data.data.token);
						}
					  resolve(result.data);
					} else {
					  reject(result.data);
					}
			})
			.catch(result => {
				if (result.response.data.status === 499) {
						message.error("您的账号在别的地方登录",1);
					return;
				}
				if (result.response.data.status === 401) {
						message.error("登录过期，重新登录",2,function(){
							history.push('/');
						});
					return;
				}
				reject(result.data);
			});
	});
	return promise;
}
