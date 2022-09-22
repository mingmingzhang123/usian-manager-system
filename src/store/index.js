import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {getLogin,user,logout} from "../api/login";
import {setToken,getToken,setUserInfo,getUserInfo} from "../utils/auth"
export default new Vuex.Store({
  state: {
    token: getToken()||'',
    userInfo:getUserInfo()|| ''
  },
  getters: {
    // 获取token
    token(state){
      return state.token
    },
    userInfo(state){
      return state.userInfo
    }
  },
  mutations: {
    // 将请求回来的token存储在vuex
    SET_TOKEN(state, token) {
      state.token = token
      // 将token传给本地存储
      setToken(token)
    },
    // 将请求回来的用户信息存储在vuex
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
      // 将用户信息传给本地存储
      setUserInfo(userInfo)
    }
  },
  actions: {
    // 登录
    async login({commit}, form) {
      try {
        // 调用登录接口的api
        const response = await getLogin(form)
        // 触发mutation中方法将token存储给本地和vuex
        commit('SET_TOKEN', response.token)
        // 将token返回出去
        return response.token
      } catch (e) {
        console.log(e.message);
      }

    },
    // 用户信息
    async handleUserInfo({commit}){
      try{
        const getuserinfo= await user()
        commit('SET_USER_INFO',getuserinfo)
        return getuserinfo
      }catch(e){
        console.log(e.message);
      }

    },
    // 退出登录
    async handlelogout({commit}){
      const response=await logout()
      commit("SET_TOKEN",'')
      commit("SET_USER_INFO",'')
      return response
    }


  },
  modules: {}
})