import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import s from './SearchInput.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import cn from 'classnames';

interface SearchInputProps {
  Icon?: IconType;
  title: string;
  wrapperClassname?: string;
  setSearch: (value: string) => void;
  search: string;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  title,
  Icon,
  wrapperClassname,
  setSearch,
  search,
  placeholder,
}) => {
  const [openOptions, setOpenOptions] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openOptions && setOpenOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, openOptions]);
  return (
    <div className={cn(s.searchInput, wrapperClassname)}>
      <h2 className={s.searchInput_title}>{title}</h2>
      <div ref={ref} className={s.searchInput_input_wrapper} onClick={() => setOpenOptions(true)}>
        <div className={s.searchInput_iconAndInput}>
          {Icon && <Icon size={18} className={s.searchInput_icon} />}
          <input
            className={s.searchInput_input}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
          />
        </div>

        {search && (
          <IoClose size={22} className={s.searchInput_cross} onClick={() => setSearch('')} />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
