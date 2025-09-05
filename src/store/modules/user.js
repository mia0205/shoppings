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

  },
  getters: {

  }

}
