import { combineReducers } from 'redux';
import { CREATE_RUN_ROUTE, CREATE_RUN, START_RUN, ADD_LOCATION_PACKET, END_ROUTE } from './action'

const INITIAL_STATE = {
  real_time_info: {
    distance: 0,
    current_pace: {minutes:0, seconds:0},
    average_pace: {minutes:0, seconds:0},
    lap_pace: {minutes:0, seconds:0},
    lap_distance: 0,
  },
  run_info: {
    route: null,
    real_time_tracking: false,
    start_time: null,
  },
  location_packets: [],
};

export function runReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info, 
          real_time_tracking : action.real_time_tracking,
        }
      })
    case CREATE_RUN_ROUTE:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info, 
          route:action.route,
          real_time_tracking:action.real_time_tracking,
        }
      })
    case START_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          start_time:action.start_time
        }
      }) 
    case ADD_LOCATION_PACKET:
      return Object.assign({}, state, {
        location_packets: [
          ...state.location_packets, 
          action.location_packet
        ]
      })
    case END_ROUTE:
      return INITIAL_STATE;
    default:
      return state
  }
};

export default combineReducers({
  runReducer,
});