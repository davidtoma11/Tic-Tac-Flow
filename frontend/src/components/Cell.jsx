import React from 'react';

const Cell = ({ value, onClick }) => {
  return (
    <div className="cell" onClick={onClick}>
      {value ? value.player : ''}
    </div>
  );
};

export default Cell;
