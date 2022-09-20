// 引入axios实例对象
import request from "../utils/rqeuire"
// 登录接口
const getLogin = (data) => {
    return request({
        // 接口地址
        url: 'user/login',
        // 标记当前请求接口
        method:'POST',
        data
    })
}
export {
    getLogin
}