// JAson YU

import { 
  STORE_LOGIN_INFO, 
  STORE_USER_INFO, LOGOUT, 
  DECLINE_FOLLOW_REQUEST, 
  ACCEPT_FOLLOW_REQUEST, 
  UNFOLLOW, 
  REQUEST_FOLLOW, 
  UPDATE_USER_INFO,
  ADD_RUN,
  ADD_ROUTE,
  ADD_SAVED_RUN,
} from './user_info_action'

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

function uniqueKey() {
  let key = new Date().getTime()
  return key
}

function updateUserInfo(new_state, update_user_info) {
  let { username, bio , full_name } = update_user_info
  if (username != '') {
    new_state = Object.assign(new_state,{username:username})
  }
  if (bio != '') {
    new_state = Object.assign(new_state,{bio:bio})
  }
  if (full_name != '') {
    new_state = Object.assign(new_state,{full_name:full_name})
  }
  return new_state
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
      return Object.assign({}, state, {
        follow_requests: filterList(state.follow_requests, action.other_user_id) // Removing other_user_id from follow requests
      })
    case ACCEPT_FOLLOW_REQUEST:
      return Object.assign({}, state, {
        follow_requests: filterList(state.follow_requests, action.other_user_id), // Removing other_user_id from follow reqeusts
        followers: [
          ...state.followers,
          action.other_user_id // Adding other_user_id to followers
        ]
      })
    case UNFOLLOW:
      return Object.assign({}, state, {
        following: filterList(state.following, action.other_user_id), // Removing other_user_id from following
      })
    case REQUEST_FOLLOW:
      return Object.assign({}, state, {
        pending_follows: [
          ...pending_follows,
          action.other_user_id // adding other user id to pending follows
        ]
      })
    case UPDATE_USER_INFO:
      return updateUserInfo(Object.assign({}, state), action.update);
    case ADD_ROUTE:
      let route_info = action.info
      let route = {
        route: route_info.route,
        distance: route_info.distance
      }
      let saved_route = {
        route: route,
        name: route_info.name,
        description: route_info.description,
        start_name: route_info.start_name,
        end_name: route_info.end_name,
      }
      let new_saved_route = {}
      new_saved_route[uniqueKey()] = saved_route
      return Object.assign({}, state, new_saved_route);
    case ADD_RUN:
      return Object.assign({}, state, {
        runs: [
          ...state.runs,
          action.info
        ]
      })
    case ADD_SAVED_RUN:
      let new_saved_run = {}
      new_saved_run[uniqueKey()] = action.info
      return Object.assign({}, state, new_saved_run);
    default:
      return state
  }
};