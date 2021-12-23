import React from 'react';
import { Icon, List } from 'semantic-ui-react';

import { HospitalEntry } from '../types';
import { entryStyle } from '../styles';
import { useStateValue } from '../state';

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{diagnoses}] = useStateValue();

  return (
    <div style={entryStyle}>
      <h3><strong>{entry.date}</strong> <Icon name='hospital'/></h3>
      <List>
        <List.Item><em>{entry.description}</em>
        <List bulleted>
          {entry.diagnosisCodes?.map(code =>
            code
            ? <List.Item key={code}>
                {code} {diagnoses[code].name}
              </List.Item>
            : null
          )}
        </List>
        </List.Item>
      </List>
      <p>Date of discharge: {entry.discharge.date}</p>
    </div>
  );
};

export default HospitalEntryDetails;