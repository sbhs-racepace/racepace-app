// Jason YU

export const STORE_USER_INFO = 'STORE_USER_INFO'
export const STORE_LOGIN_INFO = 'STORE_LOGIN_INFO'
export const LOGOUT = 'LOGOUT'

export function storeLoginInfo(login_info) {
  return { type: STORE_LOGIN_INFO, login_info}
}
export function storeUserInfo(user_info) {
  return { type: STORE_USER_INFO, user_info}
}
export function logout() {
  return { type: LOGOUT}
}