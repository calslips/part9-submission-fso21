import React from 'react';
import { Icon } from 'semantic-ui-react';

import { HealthCheckEntry, HealthCheckRating } from '../types';
import { entryStyle } from '../styles';
import { assertNever } from '../helpers';

const healthCheckRatingIcon = (rating: HealthCheckRating) => {
  switch (rating) {
    case 0:
      return <Icon name='heart' color='green'/>;
    case 1:
      return <Icon name='heart' color='yellow'/>;
    case 2:
      return <Icon name='heart' color='orange'/>;
    case 3:
      return <Icon name='heart' color='red'/>;
    default:
      return assertNever(rating as never, 'health check rating');
  }
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return(
    <div style={entryStyle}>
      <h3><strong>{entry.date}</strong> <Icon name='user md'/></h3>
      <p><em>{entry.description}</em></p>
      {healthCheckRatingIcon(entry.healthCheckRating)}
    </div>
  );
};

export default HealthCheckEntryDetails;