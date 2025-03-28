'use client';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  addGenre,
  clearGenres,
  removeGenre,
  setSearch,
  setSeason,
  setYear,
} from '@/redux/slices/MusicFilters';
import SelectInput from './Filters/SelectInput/SelectInput';
import SearchInput from './Filters/SearchInput/SearchInput';
import FiltersHamburger from './FiltersHamburger/FiltersHamburger';
import s from './MusicFilters.module.scss';
import { getAllGenres } from '@/dal/music';
import { Genre, MusicData } from '@/types/types';
import { createSelector } from 'reselect';
import { filtersSelectedData } from '@/redux/selectors/musicFiltersSelectors';
import SelectedFiltersBlock from './SelectedFiltersBlock/SelectedFiltersBlock';

const genres = [
  {
    label: 'ПОП',
    value: 'pop',
  },
  {
    label: 'РОК',
    value: 'rock',
  },
  {
    label: 'ДЖАЗ',
    value: 'jazz',
  },
];
const years = [
  {
    label: '2001',
    value: '2001',
  },
  {
    label: '2003',
    value: '2003',
  },
  {
    label: '2007',
    value: '2007',
  },
];
const seasons = [
  {
    label: 'Зима',
    value: 'winter',
  },
  {
    label: 'Весна',
    value: 'spring',
  },
  {
    label: 'Лето',
    value: 'summer',
  },
  {
    label: 'Осень',
    value: 'fall',
  },
];

const MusicFilters = () => {
  const { selectedGenres, year, search, season } = useAppSelector(filtersSelectedData);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  useEffect(() => {
    getAllGenres().then((res) => {
      const data = res && JSON.parse(res);
      setGenres(data);
    });
  }, []);
  const dispatch = useAppDispatch();
  const isAnyTagSelected = !!search || selectedGenres.length > 0;
  return (
    <div className={s.wrapper}>
      <div className={s.filters_wrap}>
        <div className={s.filters}>
          <SearchInput
            placeholder="Поиск"
            title="Поиск"
            setSearch={(value) => dispatch(setSearch(value))}
            search={search}
            Icon={FaSearch}
            wrapperClassname={s.filters_item}
          />
          <SelectInput
            selectedOption={selectedGenres}
            selectOption={(value) => dispatch(addGenre(value))}
            removeOption={(value) => dispatch(removeGenre(value))}
            clearAllOptions={() => dispatch(clearGenres())}
            options={genres?.map((genre) => ({ label: genre.label, value: genre._id })) || []}
            placeholder="Жанр"
            title="Жанр"
            multiple
            wrapperClassname={s.filters_item}
          />
          <SelectInput
            selectedOption={year}
            selectOption={(value) => dispatch(setYear([value]))}
            clearAllOptions={() => dispatch(setYear([]))}
            options={years}
            placeholder="Год"
            wrapperClassname={s.filters_item}
            title="Год"
          />
          <SelectInput
            selectedOption={season}
            selectOption={(value) => dispatch(setSeason([value]))}
            clearAllOptions={() => dispatch(setSeason([]))}
            options={seasons}
            placeholder="Сезон"
            title="Сезон"
            showInput={false}
            wrapperClassname={s.filters_item}
          />
        </div>
        <FiltersHamburger />
      </div>
      {isAnyTagSelected && <SelectedFiltersBlock genres={selectedGenres} search={search} />}
    </div>
  );
};

export default MusicFilters;
