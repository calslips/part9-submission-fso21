interface BmiValues {
  height: number,
  weight: number
}

const evaluateArgs = (args: Array<string>): BmiValues => {
  if (args.length !== 4) throw new Error(
    'Input one value for your height and one value for your weight.'
    );

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Only number values are accepted.');
  }
};

const bmiFormula = (cm: number, kg: number): number => {
  return kg / (cm / 100) ** 2;
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = bmiFormula(height, weight);

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi >= 16 && bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi >= 17 && bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range (Healthy weight)';
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi >= 30 && bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi >= 35 && bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

try {
  const {height, weight} = evaluateArgs(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Oops, something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi };
