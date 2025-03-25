import React, { ComponentProps, useEffect, useRef, useState } from 'react';
import s from './FilterInput.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { IconType } from 'react-icons/lib';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import cn from 'classnames';

interface FilterInputProps {
  type: 'select' | 'input';
  Icon?: IconType;
  title: string;
  wrapperClassname?: string;
  selectOption?: (value: { label: string; value: string }) => void;
  removeOption?: (removeValue: string) => void;
  clearAllOptions?: () => void;
  setInputValue?: (value: string) => void;
  inputValue?: string;
  selectedOption?: { label: string; value: string }[];
  options?: { label: string; value: string }[];
  placeholder?: string;
  multiple?: boolean;
}
enum Types {
  Input = 'input',
  Select = 'select',
}

const FilterInput: React.FC<FilterInputProps> = ({
  title,
  type = Types.Input,
  Icon,
  wrapperClassname,
  options,
  selectOption,
  removeOption,
  selectedOption,
  clearAllOptions,
  placeholder,
  setInputValue,
  inputValue,
  multiple = false,
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
        {Icon && <Icon size={22} className={s.filterInput_icon} />}
        {type === Types.Select && !inputActive && isAnyGenreSelected && (
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
        <input
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className={s.filterInput_input}
          value={type === Types.Select ? searchOption : inputValue}
          onChange={(e) =>
            type === Types.Select
              ? setSearchOption(e.target.value)
              : setInputValue?.(e.target.value)
          }
          placeholder={
            type === Types.Select && !inputActive && isAnyGenreSelected ? '' : placeholder
          }
        />
        {type === Types.Select && !isAnyGenreSelected && (
          <IoIosArrowDown
            className={s.filterInput_arrow}
            size={30}
            onClick={() => setOpenOptions(true)}
          />
        )}
        {type === Types.Select && isAnyGenreSelected && (
          <IoClose size={30} className={s.filterInput_cross} onClick={clearAllOptions} />
        )}

        {options && openOptions && (
          <div className={s.filterInput_selectBlock}>
            {filteredOptions?.map((option) => (
              <div
                key={option.value}
                className={s.filterInput_option}
                onClick={() =>
                  // selectedOption?.includes(option.value)
                  selectedOption?.some((obj) => obj.value === option.value)
                    ? removeOption?.(option.value)
                    : selectOption?.(option)
                }>
                {option.label}
                {selectedOption?.some((obj) => obj.value === option.value) && (
                  <IoIosCheckmarkCircle className={s.filterInput_selectedMark} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterInput;
