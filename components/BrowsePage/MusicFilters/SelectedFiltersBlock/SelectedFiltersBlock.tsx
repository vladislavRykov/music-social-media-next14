'use client';
import { Genre } from '@/types/types';
import React from 'react';
import { FaTags } from 'react-icons/fa6';
import s from './SelectedFiltersBlock.module.scss';
import { IoIosClose } from 'react-icons/io';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { clearAllFilters, removeGenre, setSearch } from '@/redux/slices/MusicFilters';

const SelectedFiltersBlock = ({
  genres,
  search,
}: {
  genres: {
    label: string;
    value: string;
  }[];
  search: string;
}) => {
  const dispatch = useAppDispatch();
  const clearAllHandler = () => {
    dispatch(clearAllFilters());
  };
  return (
    <div className={s.selectedFiltersBlock}>
      <FaTags color="#abc2cf" />
      {genres.map((genre) => (
        <div
          onClick={() => dispatch(removeGenre(genre.value))}
          className={s.selectedFiltersBlock_tag}>
          <span>{genre.label}</span>
          <IoIosClose className={s.selectedFiltersBlock_close} />
        </div>
      ))}
      {search && (
        <div onClick={() => dispatch(setSearch(''))} className={s.selectedFiltersBlock_tag}>
          <span>Поиск: {search}</span>
          <IoIosClose className={s.selectedFiltersBlock_close} />
        </div>
      )}

      <div onClick={clearAllHandler} className={s.selectedFiltersBlock_tagClearAll}>
        <span>Очистить всё</span>
        <IoIosClose className={s.selectedFiltersBlock_closeClearAll} />
      </div>
    </div>
  );
};

export default SelectedFiltersBlock;
