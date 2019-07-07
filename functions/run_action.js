// Run Actions

export const CREATE_RUN_ROUTE = 'CREATE_RUN_ROUTE'
export const CREATE_RUN = 'CREATE_RUN'
export const START_RUN = 'START_RUN'
export const ADD_LOCATION_PACKET = 'ADD_LOCATION_PACKET'
export const END_RUN = 'END_RUN'
export const SAVE_RUN = 'SAVE_RUN'
export const PAUSE_RUN = 'PAUSE_RUN'
export const RESUME_RUN = 'RESUME_RUN'

export function createRun(real_time_tracking, distance) {
  return { type: CREATE_RUN, real_time_tracking, distance }
}
export function createRunRoute(route, real_time_tracking, distance, goal_pace) {
  return { type: CREATE_RUN_ROUTE, route, real_time_tracking, distance, goal_pace}
}
export function startRun(start_time) {
  return { type: START_RUN, start_time}
}
export function addLocationPacket(location_packet) {
  return { type: ADD_LOCATION_PACKET, location_packet}
}
export function endRun() {
  return { type: END_RUN }
}
export function saveRun() {
  return { type: SAVE_RUN }
}
export function pauseRun() {
  return { type: PAUSE_RUN }
}
export function resumeRun() {
  return { type: RESUME_RUN }
}