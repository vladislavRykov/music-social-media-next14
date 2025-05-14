import Image from 'next/image';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import s from './Search.module.scss';
import SecondaryModal from '@/components/UI/Modals/SecondaryModal/SecondaryModal';
import SearchUserPopup from './SearchUserPopup/SearchUserPopup';
import { useDebounce } from '@/hooks/hooks';

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedValue = useDebounce<boolean>(isModalOpen,100);
  return (
    <div className={s.search}>
      <FaSearch
        size={20}
        className={s.searchIcon}
        onMouseOut={() => setIsModalOpen(false)}
        onMouseOver={() => setIsModalOpen(true)}
      />
      {/* <div className={s.search_popup}> */}
      {debouncedValue && (
        <SearchUserPopup setIsHovered={(value: boolean) => setIsModalOpen(value)} />
      )}
      {/* </div> */}
    </div>
  );
};

export default Search;
