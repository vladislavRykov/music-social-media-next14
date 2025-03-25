'use client';
import { changeAccountPassword, changeUserName, sendTokenToChangeEmail } from '@/actions/account';
import BlueBtn from '@/components/shared/BlueBtn/BlueBtn';
import DefaultInput from '@/components/shared/DefaultInput/DefaultInput';
import InputLoader from '@/components/UI/Loaders/InputLoader';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { changeUserFields } from '@/redux/slices/UserSlice';
import { FormikHelpers, FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import circleTube from '@/public/circleTube.svg';
import Image from 'next/image';

type Values = {
  password: string;
  confirm_pass: string;
};

const formValidationSchema = Yup.object({
  password: Yup.string().max(16, 'Максимум 16 символов в пароле.').required('Обязательное поле.'),
  confirm_pass: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
    .required('Обязательное поле.'),
});

const ChangeAccountPassword = () => {
  const isLoading: boolean = useAppSelector((state) => state.userReducer.isLoading);
  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    const res = await changeAccountPassword(values.password);
    if (!res.ok) {
      return toast.error(res.message);
    }
    toast.success(res.message);
    formik.resetForm();
  };
  const formik = useFormik({
    validationSchema: formValidationSchema,
    initialValues: {
      password: '',
      confirm_pass: '',
    },
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ marginBottom: 15 }}>
      {isLoading ? (
        <InputLoader />
      ) : (
        <>
          <DefaultInput
            name="password"
            id="password"
            placeholder="Новый пароль пользователя"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            style={{ marginBottom: 15 }}
          />
          <div style={{ padding: 5, color: 'red', fontSize: 13 }}>{formik.errors.password}</div>
          <DefaultInput
            id="confirm_pass"
            name="confirm_pass"
            type="password"
            placeholder="Повторите пароль"
            value={formik.values.confirm_pass}
            onChange={formik.handleChange}
          />
          <div style={{ padding: 5, color: 'red', fontSize: 13 }}>{formik.errors.confirm_pass}</div>
          {formik.values.password && formik.values.confirm_pass && (
            <BlueBtn disabled={formik.isSubmitting} style={{ marginTop: 15 }} type="submit">
              {!formik.isSubmitting ? (
                'Сохранить пароль'
              ) : (
                <Image src={circleTube} height={20} width={20} alt="Loading..." />
              )}
            </BlueBtn>
          )}
        </>
      )}
    </form>
  );
};

export default ChangeAccountPassword;
