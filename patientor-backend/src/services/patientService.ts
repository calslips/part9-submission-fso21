import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, NewPatient, PublicPatient, NewEntry, Entry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatientData = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getSinglePatient = (id: string): Patient | undefined=> {
  return patients.find(patient => patient.id === id);
};

const addPatient = (newPatient: NewPatient): Patient => {
  const id = uuid();
  const patientToAdd = {
    id: id,
    ...newPatient
  };
  patients.push(patientToAdd);
  return patientToAdd;
};

const addEntry = (newEntry: NewEntry, patientId: string): Entry => {
  const id = uuid();
  const entryToAdd = {
    id: id,
    ...newEntry
  };
  const patientToUpdate = patients.find(patient => patient.id === patientId);
  patientToUpdate?.entries.push(entryToAdd);
  return entryToAdd;
};

export default {
  getPatients,
  getPublicPatientData,
  getSinglePatient,
  addPatient,
  addEntry
};