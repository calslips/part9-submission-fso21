import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import {
  TextField,
  NumberField,
  DiagnosisSelection,
  EntryTypeOption,
  SelectEntryType,
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import {
  EntryType,
  HealthCheckRating,
  NewEntry as EntryFormValues,
} from '../types';

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type ValidateDischarge =
  | {
      date: string,
      criteria: string
    }
  | {
      date: string
    }
  | {
      criteria: string
    };

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck },
  { value: EntryType.OccupationalHealthcare },
  { value: EntryType.Hospital }
];

export const AddEntryForm = ({ onSubmit, onCancel}: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
        type: EntryType.HealthCheck,
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        },
        discharge: {
          date: '',
          criteria: ''
        }
      } as EntryFormValues}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string | ValidateDischarge} = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (values.type === 'HealthCheck' && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === 'OccupationalHealthcare' && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (values.type === 'Hospital') {
          if (!(values.discharge.date || values.discharge.criteria)) {
            errors.discharge = {
              date: requiredError,
              criteria: requiredError
            };
          } else if (!(values.discharge.date)) {
            errors.discharge = {
              date: requiredError
            };
          } else if (!(values.discharge.criteria)) {
            errors.discharge = {
              criteria: requiredError
            };
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className='form ui'>
            <SelectEntryType
              label='Type'
              name='type'
              options={entryTypeOptions}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            {values.type === 'HealthCheck'
              ?
                <Field
                  label='Health Check Rating'
                  name='healthCheckRating'
                  component={NumberField}
                  min={0}
                  max={3}
                />
              :
                values.type === 'OccupationalHealthcare'
                  ?
                    <>
                      <Field
                        label='Employer Name'
                        placeholder='Employer Name'
                        name='employerName'
                        component={TextField}
                      />
                      <Field
                        label='Sick Leave Start Date'
                        placeholder='YYYY-MM-DD'
                        name='sickLeave.startDate'
                        component={TextField}
                      />
                      <Field
                        label='Sick Leave End Date'
                        placeholder='YYYY-MM-DD'
                        name='sickLeave.endDate'
                        component={TextField}
                      />
                    </>
                  :  // return fields for entry type Hospital
                    <>
                      <Field
                        label='Discharge Date'
                        placeholder='YYYY-MM-DD'
                        name='discharge.date'
                        component={TextField}
                      />
                      <Field
                        label='Discharge Criteria'
                        placeholder='Discharge Criteria'
                        name='discharge.criteria'
                        component={TextField}
                      />
                    </>
            }
            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!isValid || !dirty}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;