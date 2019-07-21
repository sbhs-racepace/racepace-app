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