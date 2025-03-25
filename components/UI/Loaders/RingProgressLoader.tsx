import React from 'react';

const RingProgressLoader = ({
  progress,
  height,
  width,
}: {
  progress: number;
  height: number;
  width: number;
}) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ height, width }}>
      <svg
        width={'100%'}
        height={height}
        //   viewBox={`0 0 ${width} ${height}`}
        //   viewBox="0 0 80 80"
      >
        <circle
          // cx="90"
          // cy="90"
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="transparent"
          stroke="#4CAF50"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
    </div>
  );
};

export default RingProgressLoader;
