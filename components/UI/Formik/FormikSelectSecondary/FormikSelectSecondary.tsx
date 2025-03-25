'use client';
import { FieldHookConfig, useField } from 'formik';
import s from './FormikSelectSecondary.module.scss';
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';
import { AccessType } from '@/types/common';
import { LiaAngleDownSolid } from 'react-icons/lia';
import { IconType } from 'react-icons/lib';
import SelectOption from './SelectOption/SelectOption';

export type Option = {
  value: AccessType;
  label: string;
  desc: string;
  Icon: IconType;
};
interface OtherProps {
  options: Option[];
  label: string;
  name: string;
  wrapperClasses?: string;
}

const FormikSelectSecondary = (
  props: OtherProps & DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
) => {
  const { label, wrapperClasses, options, ...rest } = props;
  const [field, meta, helpers] = useField(rest);
  const selectRefSec = useRef<HTMLDivElement>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(() => {
    return options.find((option) => option.value === field.value) as Option;
  });

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value === field.value) as Option);
  }, [field.value, options]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionSelect = (option: Option) => {
    helpers.setValue(option.value);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (selectRefSec.current && !selectRefSec.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  return (
    <div className={wrapperClasses}>
      <div className={s.customSelect} onFocus={handleFocus} onBlur={handleBlur} ref={selectRefSec}>
        <h2 className={s.customSelect_label}>{label}</h2>
        <div className={s.customSelect_main}>
          <div onClick={toggleOpen} className={s.customSelect_selectedOption}>
            <selectedOption.Icon size={20} />
            <h3 className={s.customSelect_selectedOption_label}>{selectedOption.label}</h3>
            <LiaAngleDownSolid size={16} />
          </div>
          {isOpen && (
            <div className={s.customSelect_options}>
              {options.map((option) => (
                <SelectOption
                  selectOption={() => handleOptionSelect(option)}
                  key={option.value}
                  {...option}
                />
              ))}
            </div>
          )}
        </div>
        <div className={cn(s.customSelect_movingLine, { [s.customSelect_focused]: isFocused })}></div>
      </div>
      {meta.touched && meta.error ? <div className={s.customSelect_error}>{meta.error}</div> : null}
    </div>
  );
};
export default FormikSelectSecondary;
