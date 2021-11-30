import express from 'express'
import { calculateBmi } from './bmiCalculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  let height = Number(req.query.height)
  let weight = Number(req.query.weight)

  if ((isNaN(height) || isNaN(weight)) || (height === 0 || weight === 0)) {
    res.status(400)
    res.send({
      error: 'malformatted parameters'
    })
  } else {
    let bmi = calculateBmi(height, weight)
    res.send({
      height,
      weight,
      bmi
    })
  }

})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})