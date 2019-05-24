/**
 * drum-pad.component
 */
import React from 'react';
import './drum-pad.component.css';

export default ({
  // children,
  className = '',
}) => {
  return (
    <div className={`drum-pad ${className}`}>
      DrumPad
    </div>
  );
};