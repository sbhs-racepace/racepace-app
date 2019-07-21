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