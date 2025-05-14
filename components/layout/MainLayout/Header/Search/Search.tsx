import Image from 'next/image';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import s from './Search.module.scss';
import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import SearchUserPopup from './SearchUserPopup/SearchUserPopup';

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={s.search}>
      <FaSearch
        size={20}
        className={s.searchIcon}
        onMouseOut={() => setIsModalOpen(false)}
        onMouseOver={() => setIsModalOpen(true)}
      />
      {true && (
        <div className={s.search_popup}>
          <SearchUserPopup setIsHovered={(value:boolean)=>setIsModalOpen(value)} />
        </div>
      )}
    </div>
  );
};

export default Search;
