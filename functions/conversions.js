// Jason Yu

export function minuteSecondString(timeJSON) {
  let {minutes, seconds} = timeJSON
  if (timeJSON.minutes < 10) {
    minutes = '0' + minutes
  }
  if (timeJSON.seconds < 10) {
    seconds = '0' + seconds
  }
  return `${minutes}:${seconds}`
}

export function hourMinuteSecondString(timeJSON) {
  let {hours, minutes, seconds} = timeJSON
  if (timeJSON.hours < 10) {
    hours = '0' + hours
  }
  if (timeJSON.minutes < 10) {
    minutes = '0' + minutes
  }
  if (timeJSON.seconds < 10) {
    seconds = '0' + seconds
  }
  let time_string = `${hours}:${minutes}:${seconds}`
  return time_string
}
