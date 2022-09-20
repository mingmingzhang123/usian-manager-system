// 引入axios
import axios from "axios"
// 实例对象
const service = axios.create({
    // 公共地址
    // baseURL: 'process.env.VUE_APP_BASE-API',
    // baseURL: 'http://vue.mengxuegu.com/pro-api',

    // 超时时间
    timeout: 5000
})
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = window.localStorage.getItem("token")
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

const request = (options) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data || options.params
        delete options.data 
    }
    // 解决多个代理请求的问题
    service.defaults.baseURL = options.proxy || process.env.VUE_APP_BASE_API
    return service(options)

}
// 导出
export default request