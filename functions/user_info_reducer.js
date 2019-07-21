// JAson YU

import { STORE_LOGIN_INFO, STORE_USER_INFO, LOGOUT, DECLINE_FOLLOW_REQUEST, ACCEPT_FOLLOW_REQUEST, UNFOLLOW, FOLLOW} from './user_info_action'

const USER_INFO_INITIAL_STATE =  {
  full_name: "guest",
  username: "guest",
  email: "guest",
  bio: "guest",
  following: [],
  followers: [],
  follow_requests:[],
  pending_follows:[],
  saved_routes: {},
  saved_runs: {}, 
  runs: [],
  socket: null,
  stats: {
    num_runs: 0,
    total_distance: 0,
    longest_distance_ran: null,
    fastest_km : null,
    fastest_5km: null,
    fastest_10km : null,
    fastest_marathon: null,
    estimated_v02_max: null,
    average_heart_rate: null,
    cadence: null,
    points: 0,
  },
  token: false,  
  user_id: false,
}

function filterList(list, value) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] == value) {
      list.splice(i, 1); 
      i--;
    }
  }
  return list;
}

export default function userInfoReducer(state = USER_INFO_INITIAL_STATE, action) {
  switch (action.type) {
    case STORE_LOGIN_INFO:
      return Object.assign({}, state, 
        {
          token: action.login_info.token,
          user_id: action.login_info.user_id,
        }
      );
    case STORE_USER_INFO:
      return Object.assign({}, state, action.user_info)
    case LOGOUT:
      return USER_INFO_INITIAL_STATE;
    case DECLINE_FOLLOW_REQUEST:
      let new_follow_requests = filterList(state.follow_requests, action.other_user_id)
      return Object.assign({}, state, {
        follow_requests: new_follow_requests
      })
    case ACCEPT_FOLLOW_REQUEST:
      let new_follow_requests = filterList(state.follow_requests, action.other_user_id)
      return Object.assign({}, state, {
        follow_requests: new_follow_requests,
        followers: [
          ...state.followers,
          action.other_user_id
        ]
      })
    case UNFOLLOW:
      let new_following_list = filterList(state.following, action.other_user_id)
      return Object.assign({}, state, {
        following: new_following_list,
      })
    case FOLLOW:
      let new_pending_follows = filterList(state.pending_follows, action.other_user_id)
      return Object.assign({}, state, {
        pending_follows: new_pending_follows,
      })
    default:
      return state
  }
};