// 引入路由实例对象
import router from "./router"
// 引入vuex
import store from "vuex"
router.beforeEach((to, from, next) => {
    // 获取vuex中token
    const token = store.getters.token
    // 判断能不能获取到token
    if (token) {
        // 获取到了就放行
        next()
        // 如果vuex中已经有token了，判断是否跳转的页面是登录页面
        if (to.path == '/login') {
            // 如果是登录页面就跳转到上一个页面
            next(from.path)
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