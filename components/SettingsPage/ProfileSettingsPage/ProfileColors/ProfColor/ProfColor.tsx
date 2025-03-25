import React from 'react';
import s from '../ProfileColors.module.scss';
import chroma from 'chroma-js';
const ProfColor = ({
  color,
  onClick,
  selectedColor,
}: {
  color: string;
  onClick: () => void;
  selectedColor: string;
}) => {
  const lighterColor = chroma(color).brighten().hex(); // #a1c550
  return (
    <div
      onClick={onClick}
      style={
        selectedColor === color
          ? {
              backgroundColor: color,
              borderWidth: '4px',
              borderColor: lighterColor,
              borderStyle: 'solid',
            }
          : { backgroundColor: color }
      }
      className={s.colorSquare}></div>
  );
};

export default ProfColor;
