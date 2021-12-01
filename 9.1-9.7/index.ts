import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface ReqBody {
  daily_exercises: Array<number>,
  target: number
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if ((isNaN(height) || isNaN(weight)) || (height === 0 || weight === 0)) {
    res.status(400);
    res.send({
      error: 'malformatted parameters'
    });
  } else {
    const bmi = calculateBmi(height, weight);
    res.send({
      height,
      weight,
      bmi
    });
  }

});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ReqBody;

  if (!daily_exercises || !target) {
    res.status(400);
    res.send({
      error: 'parameters missing'
    });
  } else if ((!Array.isArray(daily_exercises) || daily_exercises.some(isNaN)) || isNaN(target)) {
    res.status(400);
    res.send({
      error: 'malformatted parameters'
    });
  } else {
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
  }

});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});