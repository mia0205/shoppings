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

// 提交订单
export const submitCheckoutAPI = (mode, obj) => {
  return request({
    url: '/checkout/submit',
    method: 'POST',
    data: {

      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      payType: 10,

      mode,
      ...obj

    }
  })
}

// 我的订单
export const myOrderAPI = (dataType, page) => {
  return request({
    url: '/order/list',
    params: {
      dataType,
      page
    }
  })
}
