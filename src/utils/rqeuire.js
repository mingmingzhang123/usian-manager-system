// 引入axios
import axios from "axios"


// 自定义错误信息提示内容
const exceptionMessage = {
    1000: '用户名或者密码错误'
}




// 引入elemenui的提示信息
import {
    Message
} from "element-ui";
import store from "../store"


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
    // 获取vuex中的token
    const token = store.getters.token
    if (token) config.headers.authorization = "Bearer " + token



    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {


    // 将res.data.data进行处理
    if (response.status < 400) {
        return response.data.data
    }

    // 将请求回来的数据和提示信息传给——showError
    _showError(response.data.data, response.data.message)
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
// 如果有数据的状态信息就返回数据的状态信息,
// 如果没有就返回数据的错误提示,
// 如果都没有就返回发送未知错误
const _showError = (errorCode, message) => {
    // 定义一个title用来显示提示信息
    let title
    title = exceptionMessage[errorCode] || message || '发生未知错误'
    Message.error(title)
}

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