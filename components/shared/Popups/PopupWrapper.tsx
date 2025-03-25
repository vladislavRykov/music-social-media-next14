import React, { PropsWithChildren, useEffect, useRef } from 'react';

interface SettingsBtnPopUpProps extends PropsWithChildren {
  styles?: React.CSSProperties;
  className?: string;
  closePopup: () => void;
  closeOnClickOutSide?: boolean;
}

const PopupWrapper: React.FC<SettingsBtnPopUpProps> = ({
  styles,
  className,
  closePopup,
  children,
  closeOnClickOutSide = true,
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  };

  useEffect(() => {
    closeOnClickOutSide && document.addEventListener('mousedown', handleClickOutside);
    return () => {
      closeOnClickOutSide && document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div ref={popupRef} className={className} style={styles}>
      {children}
    </div>
  );
};

export default PopupWrapper;
