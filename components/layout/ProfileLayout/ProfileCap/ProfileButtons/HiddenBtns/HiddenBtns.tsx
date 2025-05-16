import React from 'react';
import s from './HiddenBtns.module.scss';
import PopupWrapper from '@/components/shared/Popups/PopupWrapper';

const HiddenBtns = ({ closePopup }: { closePopup: () => void }) => {
  return (
    <PopupWrapper closePopup={closePopup} className={s.wrapper}>
      <ul className={s.hiddenBtns}>
        <li className={s.hiddenBtns_item}>Заблокировать</li>
      </ul>
    </PopupWrapper>
  );
};

export default HiddenBtns;
