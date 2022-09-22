// 引入路由实例对象
import router from "./router"
// 引入vuex
import store from "./store"
router.beforeEach(async (to, from, next) => {
    // 获取vuex中token
    const token = store.getters.token
    // 判断能不能获取到token
    if (token) {
        next()
        // 如果vuex中已经有token了，判断是否跳转的页面是登录页面
        if (to.path == '/login') {
            // 如果是登录页面就跳转到上一个页面
            next(from.path)
        } else {
            // 获取用户信息
            let userInfo = store.getters.userInfo
            // 检测一下userInfo是不是object类型如果是的话就转换成字符串类型如果不是一个对象就还是他本身
            userInfo = typeof userInfo === 'object' ? JSON.stringify(userInfo) : userInfo
            // 判断是否为空，如果为空就获取用户信息
            if (userInfo === '{}' || userInfo === '') {
                // 调用vuex中的方法获取用户信息
                const response = await store.dispatch('handleUserInfo')
                // 判断是否获取到用户信息
                if (response) {
                    // 获取到了就放行
                    next()
                } else {
                    // 没获取到就跳转到登录页面
                    next('/login')
                }

            }
        }
    } else {
        // 当没有token时跳转的是不是登录页面
        if (to.path == '/login') {
            // 如果是就放行
            next()
        } else {
            // 不是就跳转到登录页面
            next('/login')
        }

    }

})