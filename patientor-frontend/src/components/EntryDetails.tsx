import React from 'react';

import { Entry } from '../types';
import HospitalEntryDetails from './HospitalEntryDetails';
import OccupationalEntryDetails from './OccupationalEntryDetails';
import HealthCheckEntryDetails from './HealthCheckEntryDetails';
import { assertNever } from '../helpers';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry, 'entry type');
  }
};

export default EntryDetails;