import request from '@/utils/request'

// 收获地址列表
export const getAddressListAPI = () => {
  return request({
    url: '/address/list'

  })
}
