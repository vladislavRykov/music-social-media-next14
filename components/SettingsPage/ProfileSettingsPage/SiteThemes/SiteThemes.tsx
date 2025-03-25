import React from 'react';
import s from './SiteThemes.module.scss';
import SiteThemeBtn from './SiteThemeBtn/SiteThemeBtn';

const themesList = [
  {
    title: 'Стандартная',
    type: 'default',
    color: '#EDF1F5',
    text_color: '#2E3C48',
  },
  {
    title: 'Темная',
    type: 'dark',
    color: '#272C38',
    text_color: '#9FADBD',
  },
  {
    title: 'Системная тема',
    type: 'system',
    color: '#EDF1F5',
    second_color: '#272C38',
    text_color: '#9FADBD',
  },
];

const SiteThemes = () => {
  return (
    <div className={s.profThemes}>
      {themesList.map((theme) => (
        <SiteThemeBtn key={theme.type} {...theme} />
      ))}
    </div>
  );
};

export default SiteThemes;
