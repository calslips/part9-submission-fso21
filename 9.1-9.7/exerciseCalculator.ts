interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}
const calculateRating = (averageHours: number, target: number): number => {
  let rounded = Math.round(averageHours)
  if (rounded > target) {
    return 3
  } else if (rounded === target) {
    return 2
  } else {
    return 1
  }
}
const calculateExercises = (exerciseHours: Array<number>, dailyTarget: number): Result => {
  const trainingDays = exerciseHours.filter((hour) => hour > 0).length
  const totalHours = exerciseHours.reduce((previous, current) => previous + current)
  const average = (totalHours / exerciseHours.length)
  const success = average > dailyTarget
  const rating = calculateRating(average, dailyTarget)
  const ratingDescription = rating === 3 ? 'Above and beyond' : rating === 2 ? 'Within target range' : 'Target unmet'

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    target: dailyTarget,
    average,
    success,
    rating,
    ratingDescription
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
