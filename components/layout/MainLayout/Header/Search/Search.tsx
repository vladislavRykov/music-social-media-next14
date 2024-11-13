import Image from 'next/image';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import s from './Search.module.scss';

const Search = () => {
  return (
    <div>
      <FaSearch size={20} className={s.searchIcon} />
    </div>
  );
};

export default Search;
