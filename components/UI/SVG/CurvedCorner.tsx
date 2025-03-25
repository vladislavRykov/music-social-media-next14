import React from 'react';

const CurvedCorner=({ size = 20, stroke = 2, color = '#3498db', isRight = false }) =>{
  const d = `M0 0 L${size} 0 Q${size + stroke /2} ${size / 2} ${size} ${size} L0 ${size} Z`;
  const pathD = isRight ? d : d.split('').reverse().join('').replace('Q', 'X').replace('L','Q').replace('X', 'L')

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path d={pathD}
            stroke={color}
            strokeWidth={stroke}
            fill="transparent"
       />
    </svg>
  );
}

export default CurvedCorner;