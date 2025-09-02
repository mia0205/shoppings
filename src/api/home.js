import request from '@/utils/request'

// 获取首页数据
export const getHomeDataAPI = () => {
  return request({
    url: '/page/detail'

  })
}
