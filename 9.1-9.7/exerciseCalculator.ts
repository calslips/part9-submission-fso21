interface Result {
  periodLength: number,
  trainingDays: number,
  target: number,
  average: number,
  success: boolean,
  rating: number,
  ratingDescription: string
}

interface InputValues {
  hoursArray: Array<number>,
  targetValue: number
}

const parseArgs = (args: Array<string>): InputValues => {
  if (args.length < 4) throw new Error('Not enough arguments.');

  const hours = args.slice(3);
  const isNumber = (currentValue: string): boolean => !isNaN(Number(currentValue));

  if (!isNaN(Number(args[2])) && hours.every(isNumber)) {
    return {
      hoursArray: hours.map((hour) => Number(hour)),
      targetValue: Number(args[2])
    };
  } else {
    throw new Error('Only number values are accepted.');
  }
};

const calculateRating = (averageHours: number, target: number): number => {
  const rounded = Math.round(averageHours);
  if (rounded > target) {
    return 3;
  } else if (rounded === target) {
    return 2;
  } else {
    return 1;
  }
};

const calculateExercises = (exerciseHours: Array<number>, dailyTarget: number): Result => {
  const trainingDays = exerciseHours.filter((hour) => hour > 0).length;
  const totalHours = exerciseHours.reduce((previous, current) => previous + current);
  const average = (totalHours / exerciseHours.length);
  const success = average >= dailyTarget;
  const rating = calculateRating(average, dailyTarget);
  const ratingDescription = rating === 3
    ? 'Above and beyond!'
    : rating === 2
      ? 'Room for improvement.'
      : 'Where is the effort?';

  return {
    periodLength: exerciseHours.length,
    trainingDays,
    target: dailyTarget,
    average,
    success,
    rating,
    ratingDescription
  };
};

try {
  const {hoursArray, targetValue} = parseArgs(process.argv);
  console.log(calculateExercises(hoursArray, targetValue));
} catch (error: unknown) {
  let errorMessage = 'Oops, something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
