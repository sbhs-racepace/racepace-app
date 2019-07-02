import { combineReducers } from 'redux';
import { CREATE_RUN_ROUTE, CREATE_RUN, START_RUN, ADD_LOCATION_PACKET, END_RUN, SAVE_RUN, PAUSE_RUN, RESUME_RUN } from './action'
import { calculateAveragePace, speedToPace, coordDistance, calculateTimeFromPace, calculateKilojoulesBurnt, calculatePoints  } from './run.js'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import '../global';

const INITIAL_STATE = {
  real_time_info: {
    distance: 0,
    current_pace: {minutes: '--', seconds:'--'},
    average_pace: {minutes: '--', seconds:'--'},
    lap_pace: {minutes: '--', seconds:'--'},
    lap_distance: 0,
  },
  run_info: {
    route: null,
    real_time_tracking: false,
    start_time: null,
    goal_pace: {minutes:'--', seconds:'--'},
    start: null,
    end: null,
    estimated_time: null,
    estimated_distance: null,
    estimated_energy: null,
    duration: null,
    active: false,
  },
  location_packets: [],
};

async function locationUpdate() {
  let location_packet = await Location.getCurrentPositionAsync({
    accuracy: 4,
  })
  if (state.run_info.real_time_tracking) global.socket.emit('location_update',location_packet);
  state.addLocationPacket(location_packet)
}

export function runReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info, 
          real_time_tracking : action.real_time_tracking,
          estimated_distance: action.distance,
        }
      })
    case CREATE_RUN_ROUTE:
      let {route, real_time_tracking, distance, goal_pace} = action
      let estimated_time = calculateTimeFromPace(distance, goal_pace)
      let estimated_energy = calculateKilojoulesBurnt(distance)
      let points = calculatePoints(distance, goal_pace)

      return Object.assign({}, state, {
        run_info: {
          ...state.run_info, 
          route:route,
          real_time_tracking:real_time_tracking,
          estimated_distance:distance,
          estimated_time: estimated_time,
          estimated_energy: estimated_energy,
          goal_pace: goal_pace,
          points: points
        }
      })
    case START_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          start_time: action.start_time,
          active: true
        }
      }) 
    case ADD_LOCATION_PACKET:
      let { average_pace, current_pace, new_distance, location_packet} = calculateRealTimeInfo(state,action)
      return Object.assign({}, state, {
        location_packets: [
          ...state.location_packets, 
          location_packet
        ],
        real_time_info : {
          ...state.real_time_info,
          distance: new_distance,
          current_pace: current_pace,
          average_pace: average_pace,
        }
      })
    case SAVE_RUN:
      let duration = 0
      if (state.location_packets.length > 0) {
        let last_index = state.location_packets.length-1
        let end_time = state.location_packets[last_index].timestamp
        let start_time = state.run_info.start_time.getTime()
        duration = Math.abs(end_time - start) / 1000
      }
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          duration:  duration
        }
      }) 
    case END_RUN:
      return INITIAL_STATE; // Resets state
    case PAUSE_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          active: false,
        }
      }) 
    case RESUME_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          active: true,
        }
      }) 
    default:
      return state
  }
};

export default combineReducers({
  runReducer,
});