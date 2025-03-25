import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import s from './SettingsBtnPopUp.module.scss';

interface SettingsBtnPopUpProps extends PropsWithChildren {
  styles: React.CSSProperties;
  closePopup: () => void;
}

const SettingsBtnPopUp: React.FC<SettingsBtnPopUpProps> = ({ styles, closePopup, children }) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={popupRef} className={s.settingsBtnPopUp} style={styles}>
      {children}
    </div>
  );
};

export default SettingsBtnPopUp;
