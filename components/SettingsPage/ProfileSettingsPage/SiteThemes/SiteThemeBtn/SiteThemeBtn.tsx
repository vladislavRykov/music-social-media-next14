'use client'
import React from 'react';
import s from '../SiteThemes.module.scss';
import { useTheme } from 'next-themes';

const SiteThemeBtn = ({
  title,
  type,
  color,
  second_color,
  text_color,
}: {
  title: string;
  type: string;
  color: string;
  second_color?: string;
  text_color: string;
}) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      onClick={() => setTheme(type)}
      style={{ backgroundColor: color }}
      className={s.themeSquare}>
      {second_color && (
        <div
          style={{
            borderBottomWidth: '40px',
            borderBottomStyle: 'solid',
            borderBottomColor: second_color,
          }}
          className={s.triangleTopleft}></div>
      )}
      <span style={{ color: text_color }} className={s.letterA}>
        A
      </span>
    </div>
  );
};

export default SiteThemeBtn;
