import React from 'react';
import { CoursePart } from '../App';

const Part = (part: CoursePart) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unexpected course part type: ${JSON.stringify(value)}`
    )
  }

  switch (part.type) {
    case 'normal':
      return (
        <p><em>{part.description}</em></p>
      );
    case 'groupProject':
      return (
        <p>project exercises {part.groupProjectCount}</p>
      );
    case 'submission':
      return (
        <>
          <p><em>{part.description}</em></p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </>
      );
    case 'special':
      return (
        <>
          <p><em>{part.description}</em></p>
          <p>required skills: {part.requirements.join(', ')}</p>
        </>
      )
    default:
      return assertNever(part as never);
  }

};

export default Part;