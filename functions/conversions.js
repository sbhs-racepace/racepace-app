// Jason Yu

export function minuteSecondString(timeJSON) {
  let minutes = timeJSON.minutes
  if (timeJSON.minutes < 10) {
    minutes = '0' + minutes
  }
  let seconds = timeJSON.minutes
  if (timeJSON.seconds < 10) {
    seconds = '0' + seconds
  }
  return `${minutes}:${seconds}`
}

export function hourMinuteSecondString(timeJSON) {
  let hours = timeJSON.hours
  if (timeJSON.hours < 10) {
    hours = '0' + hours
  }
  let minutes = timeJSON.minutes
  if (timeJSON.minutes < 10) {
    minutes = '0' + minutes
  }
  let seconds = timeJSON.minutes
  if (timeJSON.seconds < 10) {
    seconds = '0' + seconds
  }
  return `${hours}:${minutes}:${seconds}`
}
