export function speedToPace(speed) {
  let kmTime = 1000 / speed   // in seconds
  let pace = secondsToMinutesAndSeconds(kmTime)
  return returnIfRunning(pace) // Returns invalid pace if unreasonable
}

export function calculateAveragePace(distance, initial_time, end_time) {
  let duration = calulateDuration(initial_time, end_time)
  return calculatePace(distance, duration)
}

export function secondsToMinutesAndSeconds(time) {
  let minutes = Math.floor(time / 60)
  let seconds = Math.floor(time - (minutes * 60))
  return {minutes:minutes, seconds:seconds}
}

export function calulateDuration(initial_time, end_time) {
  return Math.abs(end_time - initial_time) / 1000 // Assumption is that time is in milliseconds
}

export function calculatePace(distance, duration) {
  let speed = distance / duration // in ms^-1
  return speedToPace(speed)
}

export function radians(degree) {
  return (degree / 180 * Math.PI)
}

export function coordDistance(coord1,coord2) {
  let sin = Math.sin, sqrt = Math.sqrt, cos = Math.cos, atan2 = Math.atan2
  const EARTH_RADIUS = 6371000
  let lat1 = coord1.latitude, lon1 = coord1.longitude
  let lat2 = coord2.latitude, lon2 = coord2.longitude
  let dlat = radians(lat2 - lat1)
  let dlon = radians(lon2 - lon1)
  let a = sin(dlat / 2) * sin(dlat / 2) + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) * sin(dlon / 2)
  let c = 2 * atan2(sqrt(a), sqrt(1 - a))
  return EARTH_RADIUS * c
}

export function returnIfRunning(pace) {
  if (pace.minutes > 15) {
    pace.minutes = '--'
    pace.seconds = '--'
    return pace
  } else {
    return pace
  }
}

export function calculateTimeFromPace(distance, pace) {
  let time = (distance / 1000) * pace.minutes * 60 + (distance / 1000) * pace.seconds // Time is in seconds
  return secondsToMinutesAndSeconds(time)
}

export function calculateCaloriesBurnt(distance) {
  let weight = 60
  let calories = distance * weight * 1.036 / 1000
  return Math.floor(calories)
}

export function calculateKilojoulesBurnt(distance) {
  let calories = calculateCaloriesBurnt(distance)
  return Math.floor(calories *4.184)
}

export function calculatePoints(distance, pace) {
  return Math.floor(distance * 100 * Math.pow((1/pace.minutes),2))
}