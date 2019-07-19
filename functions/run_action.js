// Run Actions
// Jason YU

export const CREATE_RUN_ROUTE = 'CREATE_RUN_ROUTE'
export const CREATE_RUN = 'CREATE_RUN'
export const START_RUN = 'START_RUN'
export const ADD_LOCATION_PACKET = 'ADD_LOCATION_PACKET'
export const END_RUN = 'END_RUN'
export const SAVE_RUN = 'SAVE_RUN'
export const PAUSE_RUN = 'PAUSE_RUN'
export const RESUME_RUN = 'RESUME_RUN'
export const CHANGE_START = 'CHANGE_START'
export const CHANGE_END = 'CHANGE_END'
export const CHANGE_LOCATION_INPUT = 'CHANGE_LOCATION_INPUT'

export function createRun(real_time_tracking, distance) {
  return { type: CREATE_RUN, real_time_tracking, distance }
}
export function createRunRoute(route, start_packet, end_packet, real_time_tracking, distance, goal_pace) {
  return { type: CREATE_RUN_ROUTE, route, start_packet, end_packet, real_time_tracking, distance, goal_pace}
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
export function changeStart(start) {
  return { type: CHANGE_START, start }
}
export function changeEnd(end) {
  return { type: CHANGE_END, end }
}
export function changeLocationInput(value, index) {
  return { type: CHANGE_LOCATION_INPUT, value, index }
}