// Jason YU

export const STORE_USER_INFO = 'STORE_USER_INFO'
export const STORE_LOGIN_INFO = 'STORE_LOGIN_INFO'
export const LOGOUT = 'LOGOUT'

export const DECLINE_FOLLOW_REQUEST = 'DECLINE_FOLLOW_REQUEST'
export const ACCEPT_FOLLOW_REQUEST = 'ACCEPT_FOLLOW_REQUEST'
export const UNFOLLOW = 'UNFOLLOW'
export const REQUEST_FOLLOW = 'REQUEST_FOLLOW'



export function storeLoginInfo(login_info) {
  return { type: STORE_LOGIN_INFO, login_info}
}
export function storeUserInfo(user_info) {
  return { type: STORE_USER_INFO, user_info}
}
export function logout() {
  return { type: LOGOUT}
}

export function declineFollowRequest(other_user_id) {
  return { type: DECLINE_FOLLOW_REQUEST, other_user_id}
}
export function acceptFollowRequest(other_user_id) {
  return { type: ACCEPT_FOLLOW_REQUEST, other_user_id}
}
export function unfollow(other_user_id) {
  return { type: UNFOLLOW, other_user_id}
}
export function requestFollow(other_user_id) {
  return { type: REQUEST_FOLLOW, other_user_id}
}
