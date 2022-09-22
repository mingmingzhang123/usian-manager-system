// 引入axios实例对象
import request from "../utils/rqeuire"
// 登录接口
export const getLogin = (data) => {
    return request({
        // 接口地址
        url: 'user/login',
        // 标记当前请求接口
        method: 'POST',
        data
    })
}


// 获取用户信息接口
export const user = () => {
    return request({
        // 接口地址
        url: 'user/info/admin',
        method: 'GET'

    })
}
// 退出登录接口
export const logout = () => {
    return request({
        url: 'user/logout',
        method: 'POST'
    })
}