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
