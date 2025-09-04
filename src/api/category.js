import request from '@/utils/request'

export const getCategoryListAPI = () => {
  return request({
    url: '/category/list'
  })
}
