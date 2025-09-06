import request from '@/utils/request'

export const addCartAPI = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/add',
    method: 'POST',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}
// 获取购物车列表
export const getCartListAPI = () => {
  return request({
    url: '/cart/list'

  })
}
