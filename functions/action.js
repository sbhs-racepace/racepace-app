export const CREATE_RUN_ROUTE = 'CREATE_RUN_ROUTE'
export const CREATE_RUN = 'CREATE_RUN'
export const START_RUN = 'START_RUN'
export const ADD_LOCATION_PACKET = 'ADD_LOCATION_PACKET'
export const END_ROUTE = 'END_ROUTE'


export function createRun(real_time_tracking) {
  return { type: CREATE_RUN, real_time_tracking }
}
export function createRunRoute(route, real_time_tracking) {
  return { type: CREATE_RUN_ROUTE, route, real_time_tracking}
}
export function startRun(start_time) {
  return { type: START_RUN, start_time}
}
export function addLocationPacket(location_packet) {
  return { type: ADD_LOCATION_PACKET, location_packet}
}
export function endRoute() {
  return { type: END_ROUTE }
}