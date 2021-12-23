import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Icon, Button } from 'semantic-ui-react';

import { Patient, Entry, NewEntry as EntryFormValues } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, showSinglePatient, addEntry } from '../state';
import EntryDetails from '../components/EntryDetails';
import AddEntryModal from '../AddEntryModal';

const SinglePatientPage = () => {
  const [{currentPatient}, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const getSinglePatientData = async () => {
    try {
      const { data: singlePatientData } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(showSinglePatient(singlePatientData));
    } catch (e) {
      console.error(e);
    }
  };

  if (!currentPatient || !(currentPatient.id === id)) {
    void getSinglePatientData();
  }

  const addNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry([newEntry, id]));
      closeModal();
    } catch (e) {
      const errorMessage = e.response?.data as string;

      console.error(errorMessage || 'Unknown Error');
      setError(errorMessage || 'Unknown Error');
    }
  };

  return (
    <div>
      <h2>
        {currentPatient?.name} {currentPatient?.gender === 'female'
          ? <Icon name='venus' />
          : currentPatient?.gender === 'male'
            ? <Icon name='mars' />
            : <Icon name='genderless' />
        }
      </h2>
      <p>ssn: {currentPatient?.ssn}</p>
      <p>occupation: {currentPatient?.occupation}</p>
      <h3>entries</h3>
      {currentPatient?.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={addNewEntry}
        onClose={closeModal}
        error={error}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );

};

export default SinglePatientPage;