import { getUserInfo, setUserInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getUserInfo()
    }
  },
  mutations: {
    setInfo (state, obj) {
      state.userInfo = obj
      setUserInfo(obj)
    }

  },
  actions: {
    logout (context) {
      // user信息重置
      context.commit('setInfo', {})

      // 购物车信息重置,狂模块调用
      context.commit('cart/updateCart', [], { root: true })
    }

  },
  getters: {

  }

}
