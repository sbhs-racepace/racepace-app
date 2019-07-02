export function speedToPace (speed) {
  let kmTime = 1000 / speed // in seconds
  let minutes = Math.floor(kmTime / 60)
  let seconds = kmTime - minutes * 60
  let pace = {
    minutes: minutes,
    seconds: seconds
  }
  return pace
}

export function calculateAveragePace (distance, initial_time, end_time) {
  let duration = calculate_duration(initial_time, end_time)
  return calculatePace(distance, duration)
}

export function calculate_duration (initial_time, end_time) {
  return Math.abs(end_time - initial_time) / 1000 // Seconds
}

export function calculatePace (distance, duration) {
  let speed = distance / duration // in ms^-1
  return speedToPace(speed)
}

export function radians (degree) {
  return (degree / 180 * Math.PI)
}

export function coordDistance (coord1, coord2) {
  let sin = Math.sin; let sqrt = Math.sqrt; let cos = Math.cos; let atan2 = Math.atan2
  const EARTH_RADIUS = 6371000
  let lat1 = coord1.latitude; let lon1 = coord1.longitude
  let lat2 = coord2.latitude; let lon2 = coord2.longitude
  let dlat = radians(lat2 - lat1)
  let dlon = radians(lon2 - lon1)
  let a = sin(dlat / 2) * sin(dlat / 2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) * sin(dlon / 2)
  let c = 2 * atan2(sqrt(a), sqrt(1 - a))
  return EARTH_RADIUS * c
}

export function returnIfRunning (pace) {
  if (pace.minutes > 15) {
    pace.minutes = '--'
    pace.seconds = '--'
    return pace
  } else {
    return pace
  }
}
