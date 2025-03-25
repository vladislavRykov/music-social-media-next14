import React from 'react';
import s from './CircleDefault.module.scss'

const CircleDefault = ({ x, y, key,color }: { x: any; y: any; key: any,color: string }) => {
  return <div className={s.circle} style={{ left: `${x}px`, top: `${y}px`,backgroundColor: color }} key={key} />;
};

export default CircleDefault;
