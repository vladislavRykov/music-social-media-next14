import React from 'react';
import { CgMenuBoxed } from 'react-icons/cg';
import s from './FiltersHamburger.module.scss';

const FiltersHamburger = () => {
  return (
    <div className={s.filtersHamburger}>
      <CgMenuBoxed size={22}/>
    </div>
  );
};

export default FiltersHamburger;
