// Roy Wu, Jason Yu

export function levelCalc(points) {
  let levelpoints = 0.6 * Math.sqrt(points);
  let level = Math.floor(levelpoints)
  return level
}

export function levelToPoints(level) {
  let points = Math.floor((level / 0.6) ** 2)
  return points
}

export function calculateRemainder(points) {
  let currentLevel = levelCalc(points)
  let nextLevelPoints = levelToPoints(currentLevel + 1)
  return nextLevelPoints - points
}

export function calculateLevelProgress(points) {
  let currentLevel = levelCalc(points)
  let currentLevelPoints = levelToPoints(currentLevel)
  let nextLevelPoints = levelToPoints(currentLevel + 1)
  let level_total = Math.abs(nextLevelPoints - currentLevelPoints)
  let level_progress = Math.abs(points - currentLevelPoints)
  let progress = level_progress / level_total
  return progress
}

export function run_stats(distance, time) {
  // returns 10 points per km, and 1 point per minute
  let x = (distance / 1000) * 10 
  let y = ((time.hours * 60 + time.minutes) * 60 + time.seconds ) / 120
  return x + y;
}