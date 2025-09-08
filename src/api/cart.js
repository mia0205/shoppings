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
// 购物车商品更新
export const updateCartListAPI = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/update',
    method: 'POST',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }

  })
}
// 删除购物车商品
export const clearCartListAPI = (cartIds) => {
  return request({
    url: '/cart/clear',
    method: 'POST',
    data: {
      cartIds
    }
  })
}
