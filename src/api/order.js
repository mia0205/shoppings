import request from '@/utils/request'

export const CheckOutOrderAPI = (mode, obj) => {
  return request({
    url: '/checkout/order',
    params: {
      mode,
      delivery: 10,
      shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}
