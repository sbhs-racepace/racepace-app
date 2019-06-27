import { combineReducers } from 'redux';

const INITIAL_STATE = {
  real_time_info: {
    distance: null,
    current_pace: null,
    average_pace: null,
    lap_pace: null,
    lap_distance: null,
  },
  run_info: {
    run_type: null,
    route: null,
    real_time_tracking: null,
    start_time: null,
  },
  location_packets: [],
};

const runReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ROUTE':
      state.run_info.run_type = 'ROUTE'
      return state
    case 'RUN':
      state.run_info.run_type = 'RUN'
      return state
    default:
      return state
    
  }
};

export default combineReducers({
  run: runReducer,
});