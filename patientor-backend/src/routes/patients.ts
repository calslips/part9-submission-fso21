import express from 'express';
import patientService from '../services/patientService';
import { NewPatient, NewEntry } from '../types';
import {validateNewPatient, validateNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatientData());
});

router.post('/', (req, res) => {
  try {
    const newPatient = validateNewPatient(req.body as NewPatient);
    const addedPatient = patientService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Oops, something\'s wrong.';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(patientService.getSinglePatient(id));
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  try {
    const newEntry = validateNewEntry(req.body as NewEntry);
    const addedEntry = patientService.addEntry(newEntry, id);
    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Oops, something\'s wrong.';
    if (error instanceof Error) {
      errorMessage += ' ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;