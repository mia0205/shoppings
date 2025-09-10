import request from '@/utils/request'

export const getUserInfoAPI = () => {
  return request({
    url: '/user/info'

  })
}
