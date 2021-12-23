import React from 'react';
import { Icon, List } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../types';
import { entryStyle } from '../styles';

const OccupationalEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div style={entryStyle}>
    <h3><strong>{entry.date}</strong> <Icon name='stethoscope'/>
    {entry.employerName && <strong>{entry.employerName}</strong>}</h3>
    <p><em>{entry.description}</em></p>
    {entry.sickLeave
      ? <List>
          <List.Header><h4>Sick Leave</h4></List.Header>
          <List.Item>
            Start date: {entry.sickLeave.startDate}
          </List.Item>
          <List.Item>
            End date: {entry.sickLeave.endDate}
          </List.Item>
        </List>
      : null
    }
  </div>
  );
};

export default OccupationalEntryDetails;