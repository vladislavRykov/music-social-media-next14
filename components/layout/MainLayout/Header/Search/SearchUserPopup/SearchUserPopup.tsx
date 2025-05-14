import React, { useEffect, useState } from 'react';
import s from './SearchUserPopup.module.scss';
import cn from 'classnames';
import { IoTriangleSharp } from 'react-icons/io5';
import SearchUserPopupMain from '../SearchUserPopupMain/SearchUserPopupMain';
import { delay } from '@/utils/delay';

const SearchUserPopup = ({ setIsHovered }: { setIsHovered: (value: boolean) => void }) => {
  return (
    <div
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
      className={s.searchUserPopup_wrapper}>
      <div className={s.searchUserPopup_hiddenTopDiv}>
        <IoTriangleSharp className={s.searchUserPopup_triangle} />
      </div>
      <div className={s.searchUserPopup_content}>
        <SearchUserPopupMain />
      </div>
    </div>
  );
};

export default SearchUserPopup;
