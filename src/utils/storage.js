// 获取个人信息
const USERINFO_KEY = 'user_info'
export const getUserInfo = () => {
  const resultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(USERINFO_KEY)
  return result ? JSON.parse(result) : resultInfo
}
export const setUserInfo = (list) => {
  localStorage.setItem(USERINFO_KEY, JSON.stringify(list))
}
export const clearUserInfo = () => {
  localStorage.removeItem(USERINFO_KEY)
}

// 持久化处理
const INFO_KEY = 'hm_search_inf0'
export const getSearchInfo = () => {
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : []
}

// 设置持久化
export const setSearchInfo = (arr) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(arr))
}
