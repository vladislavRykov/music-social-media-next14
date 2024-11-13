import { FieldHookConfig, useField } from 'formik';
import s from './AuthFormField.module.scss';
import React, { DetailedHTMLProps, InputHTMLAttributes, useRef } from 'react';
import cn from 'classnames';

interface OtherProps {
  label: string;
  name: string;
  wrapperClasses?: string;
}

const AuthFormField = (
  props: OtherProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  const { label, wrapperClasses, ...rest } = props;
  const [field, meta] = useField(rest);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={wrapperClasses}>
      <div className={s.field_wrapper}>
        <label
          htmlFor={rest.name}
          className={cn(s.field_label, { [s.label_showed]: inputRef.current?.value })}>
          {label}
        </label>
        <input ref={inputRef} id={rest.name} className={s.field_input} {...field} {...rest} />
      </div>
      {meta.touched && meta.error ? <div className={s.field_error}>{meta.error}</div> : null}
    </div>
  );
};
export default AuthFormField;
