import { CREATE_RUN_ROUTE, CREATE_RUN, START_RUN, ADD_LOCATION_PACKET, END_RUN, SAVE_RUN, PAUSE_RUN, RESUME_RUN } from './run_action'
import { calculateAveragePace, speedToPace, coordDistance, calculateTimeFromPace, calculateKilojoulesBurnt, calculatePoints  } from './run.js'

const RUN_INITIAL_STATE = {
  real_time_info: {
    distance: 0,
    current_pace: {minutes: '--', seconds:'--'},
    average_pace: {minutes: '--', seconds:'--'},
    lap_pace: {minutes: '--', seconds:'--'},
    lap_distance: 0,
    lap_start: null,
  },
  run_info: {
    route: null,
    real_time_tracking: false,
    start_time: null,
    start: null,
    end: null,
    goal_pace: {minutes:'--', seconds:'--'},
    estimated_duration: null,
    estimated_distance: null,
    estimated_energy: null,
    final_duration: null,
    final_distance: null,
    final_energy: null,
    active: false,
  },
  location_packets: [],
};

function calculateRealTimeInfo(state, location_packet) {
  // General Distance and Pace Update
  state.location_packets.push(location_packet)
  let end_time = location_packet.timestamp
  let start_time = state.run_info.start_time.getTime()
  let change_in_distance = 0
  if (state.location_packets.length > 0) {
    let previous_location = state.location_packets[state.location_packets.length-1]
    let change_in_distance = coordDistance(previous_location.coords, location_packet.coords)
  }
  state.real_time_info.distance = state.real_time_info.distance + change_in_distance
  state.real_time_info.average_pace = calculateAveragePace(new_distance, start_time, end_time)
  state.real_time_info.current_pace = speedToPace(location_packet.coords.speed)
  // Updating Lap Pace and Distance
  let new_lap_distance = state.real_time_info.lap_distance + change_in_distance
  if (new_lap_distance > 1000) {
    state.real_time_info.lap_distance = 0
    state.real_time_info.lap_pace = state.real_time_info.current_pace // Can't determine pace from no distance
    state.real_time_info.lap_start = end_time // Setting new time to last location request
  } else {
    state.real_time_info.lap_distance = new_lap_distance
    state.real_time_info.lap_pace = calculateAveragePace(lap_distance, state.real_time_info.lap_start, end_time)
  }
  return state;
}

export default function runReducer(state = RUN_INITIAL_STATE, action) {
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
      let estimated_duration = calculateTimeFromPace(distance, goal_pace)
      let estimated_energy = calculateKilojoulesBurnt(distance)
      let points = calculatePoints(distance, goal_pace)

      return Object.assign({}, state, {
        run_info: {
          ...state.run_info, 
          route:route,
          real_time_tracking:real_time_tracking,
          estimated_distance:distance,
          estimated_duration: estimated_duration,
          estimated_energy: estimated_energy,
          goal_pace: goal_pace,
          points: points
        }
      })
    case START_RUN:
      return Object.assign({}, state, {
        real_time_info: {
          ...state.real_time_info,
          lap_start: action.start_time
        },
        run_info: {
          ...state.run_info,
          start_time: action.start_time,
          active: true
        }
      }) 
    case ADD_LOCATION_PACKET:
      let new_state = calculateRealTimeInfo(state, action.location_packet)
      return new_state
    case SAVE_RUN:
      let final_duration = 0
      let final_distance = state.real_time_info.distance
      let final_energy = calculateKilojoulesBurnt(final_distance)
      if (state.location_packets.length > 0) {
        let last_index = state.location_packets.length-1
        let end_time = state.location_packets[last_index].timestamp
        let start_time = state.run_info.start_time.getTime()
        final_duration = Math.abs(end_time - start) / 1000
      }

      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          final_duration: final_duration,
          final_distance: final_distance,
          final_energy: final_energy,
        }
      }) 
    case END_RUN:
      return RUN_INITIAL_STATE
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