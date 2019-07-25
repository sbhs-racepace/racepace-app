// Jason YU

import { 
  CREATE_RUN_ROUTE, 
  CREATE_RUN, 
  START_RUN, 
  ADD_LOCATION_PACKET, 
  END_RUN, 
  SAVE_RUN, 
  PAUSE_RUN, 
  RESUME_RUN, 
  CHANGE_END, 
  CHANGE_START, 
  CHANGE_LOCATION_INPUT, 
  INCREMENT_TIMER 
} from './run_action'
import { calculateAveragePace, speedToPace, coordDistance, calculateTimeFromPace, calculateKilojoulesBurnt, calculatePoints  } from './run.js'
import { run_stats } from './points';
import '../global'

const RUN_INITIAL_STATE = {
  real_time_info: {
    current_distance: 0,
    current_pace: {minutes: '--', seconds:'--'},
    average_pace: {minutes: '--', seconds:'--'},
    lap_pace: {minutes: '--', seconds:'--'},
    timer: {hours: 0, minutes: 0, seconds:0},
    lap_distance: 0,
    lap_start_time: null,
  },
  run_info: {
    route: null,
    real_time_tracking: false,
    start_time: null,
    goal_pace: {minutes:'--', seconds:'--'},
    average_pace: {minutes:'--', seconds:'--'},
    estimated_duration: {minutes:'--', seconds:'--'},
    estimated_distance: null,
    estimated_energy: null,
    final_duration: {minutes:'--', seconds:'--'},
    final_distance: null,
    final_energy: null,
    points: 0,
    active: false,
    start: null,
    end: null,
  },
  run_setup: {
    start: 'Current Location',
    end: '',
    locations: {},
  },
  location_packets: [],
};

function calculateLapValues(current_lap_distance, change_in_distance, old_lap_start_time, current_pace, end_time) {
  let lap_distance, lap_pace, lap_start_time;
  let new_lap_distance = current_lap_distance + change_in_distance
  if (new_lap_distance > 1000) {
    lap_distance = 0;
    lap_pace = current_pace;
    lap_start_time = end_time
  } else {
    lap_distance = new_lap_distance
    lap_pace = calculateAveragePace(new_lap_distance, old_lap_start_time, end_time)
    lap_start_time = old_lap_start_time;
  }
  return {lap_distance, lap_pace, lap_start_time};
}

function calculateGeneralValues(start_time, current_distance, location_packet, location_packets) {
  let end_time = location_packet.timestamp
  let speed = location_packet.speed
  let current_pace = speedToPace(speed) // Using Estimated Speed by expo if not enough info
  let change_in_distance = 0
  if (location_packets.length > 0) {
    let previous_location = location_packets[location_packets.length-1]
    let previous_time = previous_location.timestamp
    change_in_distance = coordDistance(previous_location, location_packet)
    current_distance += change_in_distance
    current_pace = calculateAveragePace(change_in_distance, previous_time, end_time) 
    // Using previous location to calculate current pace
  }
  let average_pace = calculateAveragePace(current_distance, start_time, end_time)
  return {current_distance, average_pace, current_pace, change_in_distance}
}


function generateNewState(state, location_packet) {
  // General Distance and Pace Update
  let end_time = location_packet.timestamp
  let {current_distance, average_pace, current_pace, change_in_distance } = calculateGeneralValues(
    state.run_info.start_time.getTime(),
    state.real_time_info.current_distance,
    location_packet,
    state.location_packets,
  )
  state.real_time_info.current_distance = current_distance
  state.real_time_info.average_pace = average_pace
  state.real_time_info.current_pace = current_pace
  state.location_packets.push(location_packet) // Adding Location packet after updating values
  // console.log(current_distance, average_pace, current_pace)

  // Updating Lap Pace and Distance
  let {lap_distance, lap_pace, lap_start_time} = calculateLapValues(
    state.real_time_info.lap_distance,
    change_in_distance,
    state.real_time_info.lap_start_time,
    state.current_pace,
    end_time
  )
  state.real_time_info.lap_distance = lap_distance
  state.real_time_info.lap_pace = lap_pace
  state.real_time_info.lap_start_time = lap_start_time
  // console.log(lap_distance, lap_pace, lap_start_time)
  return state;
}

function incrementTimer(time) {
  let {hours,minutes,seconds} = time;
  seconds++;
  if (seconds == 60) {
    minutes++;
    seconds=0;
  }
  if (minutes == 60) {
    hours++;
    minutes=0;
  }
  return {hours, minutes, seconds};
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
      let {start_packet, end_packet, route, real_time_tracking, distance, goal_pace} = action
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info, 
          route:route,
          real_time_tracking:real_time_tracking,
          estimated_distance:distance,
          estimated_duration: calculateTimeFromPace(distance, goal_pace),
          estimated_energy: calculateKilojoulesBurnt(distance),
          goal_pace: goal_pace,
          points: calculatePoints(distance, goal_pace),
          start: start_packet,
          end: end_packet,
        }
      })
    case START_RUN:
      return Object.assign({}, state, {
        real_time_info: {
          ...state.real_time_info,
          lap_start_time: action.start_time.getTime()
        },
        run_info: {
          ...state.run_info,
          start_time: action.start_time,
          active: true
        }
      })
    case ADD_LOCATION_PACKET:
      let new_state = Object.assign({}, state);
      return generateNewState(new_state, action.location_packet)
    case INCREMENT_TIMER:
      let new_time = incrementTimer(state.real_time_info.timer)
      return Object.assign({}, state, {
        real_time_info: {
          ...state.real_time_info,
          timer: new_time,
        },
      }) 
    case SAVE_RUN:
      return Object.assign({}, state, {
        run_info: {
          ...state.run_info,
          final_duration: state.real_time_info.timer,
          final_distance: state.real_time_info.current_distance,
          final_energy: calculateKilojoulesBurnt(state.real_time_info.current_distance),
          average_pace: state.real_time_info.average_pace,
          points: run_stats(state.real_time_info.current_distance, state.real_time_info.timer)
        }
      }) 
    case END_RUN:
      return RUN_INITIAL_STATE;
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
    case CHANGE_END:
        return Object.assign({}, state, {
          run_setup: {
            ...state.run_setup,
            end: action.end,
          }
        }) 
    case CHANGE_START:
      return Object.assign({}, state, {
        run_setup: {
          ...state.run_setup,
          start: action.start, // Just sets up the end location
        }
      }) 
    case CHANGE_LOCATION_INPUT:
      let newLocations = state.run_setup.locations;
      newLocations[action.index] = action.value;
      return Object.assign({}, state, {
        run_setup: {
          ...state.run_setup,
          locations: newLocations,
        }
      }) 
    default:
      return state
  }
};