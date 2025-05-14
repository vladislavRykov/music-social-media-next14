import React from 'react';
import s from './SearchUserPopup.module.scss';
import cn from 'classnames';
import { IoTriangleSharp } from 'react-icons/io5';
import SearchUserPopupMain from '../SearchUserPopupMain/SearchUserPopupMain';

const SearchUserPopup = ({ setIsHovered }: { setIsHovered: (value: boolean) => void }) => {
  return (
    <div
      onMouseOut={() => setIsHovered(false)}
      onMouseOver={() => setIsHovered(true)}
      className={s.searchUserPopup_wrapper}>
      <div className={s.searchUserPopup_hiddenTopDiv}>
        <IoTriangleSharp color="white" className={s.searchUserPopup_triangle} />
      </div>
      <div className={s.searchUserPopup_content}>
        <SearchUserPopupMain />
      </div>
    </div>
  );
};

export default SearchUserPopup;
