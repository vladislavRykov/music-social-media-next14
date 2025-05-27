import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import s from './SelectInput.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import cn from 'classnames';
import { Genre } from '@/types/types';

interface SelectInputProps {
  title: string;
  wrapperClassname?: string;
  selectOption: (value: { label: string; value: string }) => void;
  removeOption?: (removeValue: string) => void;
  clearAllOptions: () => void;
  selectedOption?: { label: string; value: string }[];
  options: { label: string; value: string }[];
  placeholder?: string;
  multiple?: boolean;
  showInput?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  title,
  wrapperClassname,
  options,
  selectOption,
  removeOption,
  selectedOption,
  clearAllOptions,
  placeholder,
  multiple = false,
  showInput = true,
}) => {
  const [openOptions, setOpenOptions] = useState(false);
  const [searchOption, setSearchOption] = useState('');
  const [inputActive, setInputActive] = useState(false);
  const filteredOptions = options?.filter((option) => {
    if (!searchOption) return true;
    if (
      option.label.toLowerCase().includes(searchOption.toLowerCase()) ||
      option.value.toLowerCase().includes(searchOption.toLowerCase())
    ) {
      return true;
    }
  });

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openOptions && setOpenOptions(false);
        setSearchOption('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, openOptions]);
  const isAnyGenreSelected = selectedOption && selectedOption?.length > 0;
  return (
    <div className={cn(s.filterInput, wrapperClassname)}>
      <h2 className={s.filterInput_title}>{title}</h2>
      <div ref={ref} className={s.filterInput_input_wrapper} onClick={() => setOpenOptions(true)}>
        {multiple && !inputActive && isAnyGenreSelected && (
          <div className={s.filterInput_selectedGenres}>
            <div
              className={s.filterInput_lastSelectedGendre}
              onClick={() => removeOption?.(selectedOption[selectedOption.length - 1].value)}>
              {selectedOption[selectedOption.length - 1].label}
            </div>
            {selectedOption.length > 1 && (
              <div className={s.filterInput_selectedGenresCount}>{`+${
                selectedOption.length - 1
              }`}</div>
            )}
          </div>
        )}
        {!inputActive && !multiple && (
          <div
            className={cn(s.filterInput_selectedGenre,{[s.filterInput_selectedGenre_selected]:isAnyGenreSelected})}
            >
            {isAnyGenreSelected ? selectedOption[0].label : placeholder}
          </div>
        )}
        {!inputActive && multiple && !isAnyGenreSelected && (
          <div  className={s.filterInput_selectedGenre}>
            {placeholder}
          </div>
        )}

        <div className={s.filterInput_iconAndInput}>
          {showInput && (
            <input
              disabled={!showInput}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              className={s.filterInput_input}
              value={searchOption}
              onChange={(e) => setSearchOption(e.target.value)}
              // placeholder={(!inputActive && isAnyGenreSelected) || !multiple ? '' : placeholder}
            />
          )}
          {!isAnyGenreSelected && (
            <IoIosArrowDown
              className={s.filterInput_arrow}
              size={22}
              // style={{ fontSize: 20 }}
              onClick={() => setOpenOptions(true)}
            />
          )}
          {isAnyGenreSelected && (
            <IoClose
              size={22}
              className={s.filterInput_cross}
              onClick={(e) => {
                e.stopPropagation();
                clearAllOptions();
              }}
              //  onClick={clearAllOptions}
            />
          )}
        </div>

        {options && openOptions && (
          <div className={s.filterInput_selectBlock}>
            {filteredOptions?.map((option) => (
              <div
                key={option.value}
                style={
                  !multiple && selectedOption?.[0]?.value === option.value
                    ? { color: '#3db4f3' }
                    : {}
                }
                title={option.label}
                className={s.filterInput_option}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedOption?.some((obj) => obj.value === option.value)) {
                    removeOption?.(option.value);
                  } else {
                    selectOption?.(option);
                  }
                  setSearchOption('')
                  !multiple && setOpenOptions(false);
                }}>
                <span>{option.label}</span>
                <div className={s.filterInput_selectedMark_wrapper}>
                  {selectedOption?.some((obj) => obj.value === option.value) && (
                    <IoIosCheckmarkCircle className={s.filterInput_selectedMark} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
