import { combineReducers } from 'redux'
import { CREATE_RUN_ROUTE, CREATE_RUN, START_RUN, ADD_LOCATION_PACKET, END_ROUTE } from './action'
import { calculateAveragePace, speedToPace, coordDistance, returnIfRunning } from './run.js'

const INITIAL_STATE = {
  real_time_info: {
    distance: 0,
    current_pace: { minutes: 0, seconds: 0 },
    average_pace: { minutes: 0, seconds: 0 },
    lap_pace: { minutes: 0, seconds: 0 },
    lap_distance: 0
  },
  run_info: {
    route: null,
    real_time_tracking: false,
    start_time: null
  },
  location_packets: []
}

export function runReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          real_time_tracking: action.real_time_tracking
        }
      })
    case CREATE_RUN_ROUTE:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          route: action.route,
          real_time_tracking: action.real_time_tracking
        }
      })
    case START_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          start_time: action.start_time
        }
      })
    case ADD_LOCATION_PACKET:
      let location_packet = action.location_packet
      let end_time = location_packet.timestamp
      let start_time = state.run_info.start_time.getTime()
      let new_distance = state.real_time_info.distance
      if (state.location_packets.length > 0) {
        let last_index = state.location_packets.length - 1
        let last_pos = state.location_packets[last_index]
        let change_in_distance = coordDistance(last_pos.coords, location_packet.coords)
        new_distance = state.real_time_info.distance + change_in_distance
      }
      let average_pace = returnIfRunning(calculateAveragePace(new_distance, start_time, end_time))
      let current_pace = returnIfRunning(speedToPace(location_packet.coords.speed))
      console.log(location_packet)
      console.log('average', average_pace)
      console.log('current', current_pace)
      return Object.assign({}, state, {
        location_packets: [
          ...state.location_packets,
          location_packet
        ],
        real_time_info: {
          ...state.real_time_info,
          distance: new_distance,
          current_pace: current_pace,
          average_pace: average_pace
        }
      })
    case END_ROUTE:
      return INITIAL_STATE // Resets state
    default:
      return state
  }
};

export default combineReducers({
  runReducer
})
