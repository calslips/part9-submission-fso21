import {
  NewPatient,
  Gender,
  patientInputs,
  entryInputs,
  NewEntry,
  Discharge,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Name missing or formatted incorrectly');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Date missing or formatted incorrectly: ' + date + '\nValid format: YYYY-MM-DD');
  }
  return date;
};

const ssnRegex = new RegExp(/^(\d{3})-?(\d{2})-?(\d{4})$/);

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !ssnRegex.test(ssn)) {
    throw new Error(
      'SSN missing or formatted incorrectly. Valid format: XXX-XX-XXXX or XXXXXXXXX.'
    );
  }
  return ssn;
};

const isGender = (param: unknown): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Gender missing or formatted incorrectly: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Occupation missing or formatted incorrectly: ' + occupation);
  }
  return occupation;
};

export const validateNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: patientInputs): NewPatient => {
  const newPatientData: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newPatientData;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Specialist missing or formatted incorrectly: ' + specialist);
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Description missing or formatted incorrectly: ');
  }
  return description;
};

const parseDischarge = (discharge: Discharge | undefined): Discharge => {
  if (!discharge) {
    throw new Error('Discharge missing: ' + discharge);
  }
  if (!discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
    throw new Error(
      'Discharge date missing or formatted incorrectly: ' + discharge.date + '\nValid format: YYYY-MM-DD'
    );
  }
  if (!discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('Discharge criteria missing or formatted incorrectly: ' + discharge.criteria);
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Employer name missing or formatted incorrectly: ' + employerName);
  }
  return employerName;
};

const isValidHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param as HealthCheckRating);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!healthCheckRating || !isValidHealthCheckRating(Number(healthCheckRating))) {
    throw new Error('Health check rating missing or formatted incorrectly: ' + healthCheckRating);
  }
  return Number(healthCheckRating);
};

export const validateNewEntry = ({
  date,
  type,
  specialist,
  description,
  diagnosisCodes,
  discharge,
  employerName,
  healthCheckRating,
  sickLeave
}: entryInputs): NewEntry => {
  if (type === 'Hospital') {
    const newEntry: Omit<HospitalEntry, 'id'> = {
      date: parseDate(date),
      type,
      specialist: parseSpecialist(specialist),
      description: parseDescription(description),
      diagnosisCodes,
      discharge: parseDischarge(discharge),
    };
    return newEntry;
  } else if (type === 'OccupationalHealthcare') {
    const newEntry: Omit<OccupationalHealthcareEntry, 'id'> = {
      date: parseDate(date),
      type,
      specialist: parseSpecialist(specialist),
      description: parseDescription(description),
      diagnosisCodes,
      employerName: parseEmployerName(employerName),
      sickLeave
    };
    return newEntry;
  } else if (type === 'HealthCheck') {
    const newEntry: Omit<HealthCheckEntry, 'id'> = {
      date: parseDate(date),
      type,
      specialist: parseSpecialist(specialist),
      description: parseDescription(description),
      diagnosisCodes,
      healthCheckRating: parseHealthCheckRating(healthCheckRating)
    };
    return newEntry;
  }
  throw new Error('Invalid entry type: ' + type);
};
