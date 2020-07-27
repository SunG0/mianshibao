// 将token保存为常量，便于维护
const TOKENKEY = 'MSB_TOKEN'

function setToken (token) {
  window.localStorage.setItem(TOKENKEY, token)
}
function getToken () {
  return window.localStorage.getItem(TOKENKEY)
}
function removeToken () {
  window.localStorage.removeItem(TOKENKEY)
}
export { setToken, getToken, removeToken }
