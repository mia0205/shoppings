import { getCartListAPI } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartlist: []

    }
  },
  mutations: {
    updateCart (state, arr) {
      state.cartlist = arr
    },
    toggleCheck (state, id) {
      const goods = state.cartlist.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },
    reversCheck (state, ck) {
      state.cartlist.forEach(item => { item.isChecked = ck })
    }

  },
  getters: {
    // 求商品累加总数
    cartTotal (state) {
      return state.cartlist.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartlist.filter(item => item.isChecked)
    },
    // 求总数
    cartNum (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 求总和
    cartSum (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_max, 0).toFixed(2)
    },
    // 全选
    isAllChecked (state) {
      return state.cartlist.every(item => item.isChecked)
    }

  },
  actions: {
    async getCartAction (context) {
      const res = await getCartListAPI()
      console.log(res)
      res.data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('updateCart', res.data.list)
    }
  }

}
