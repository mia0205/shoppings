import request from '@/utils/request'

// 商品搜素
export const searchGoodsAPI = ({ goodsName, categoryId, page }) => {
  return request({
    url: '/goods/list',
    params: {

      goodsName: '',
      categoryId: '',
      page: ''
    }
  })
}
