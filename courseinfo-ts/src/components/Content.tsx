import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

const Content = (part: CoursePart) => {
  return (
    <div>
      <p><strong>{part.name} {part.exerciseCount}</strong></p>
      <Part {...part} />
    </div>
  )
}

export default Content;