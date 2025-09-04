import request from '@/utils/request'

export const getGoodsDetailsAPI = (goodsId) => {
  return request({
    url: '/goods/detail',
    params: {
      goodsId
    }
  })
}

// 获取商品评论
export const getGoodsReviewAPI = (goodsId, limit) => {
  return request({
    url: '/comment/listRows',
    params: {
      goodsId,
      limit
    }
  })
}
