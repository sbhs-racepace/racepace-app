import { STORE_LOGIN_INFO, STORE_USER_INFO, LOGOUT } from './user_info_action'

const USER_INFO_INITIAL_STATE =  {
  full_name: "guest",
  username: "guest",
  email: "guest",
  bio: "guest",
  following: [],
  followers: [],
  user_routes: [],
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
  user_id: false 
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
    default:
      return state
  }
};