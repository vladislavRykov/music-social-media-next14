'use client';
import { changeUserName } from '@/actions/account';
import BlueBtn from '@/components/shared/BlueBtn/BlueBtn';
import DefaultInput from '@/components/shared/DefaultInput/DefaultInput';
import InputLoader from '@/components/UI/Loaders/InputLoader';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { changeUserFields } from '@/redux/slices/UserSlice';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import circleTube from '@/public/circleTube.svg';
import { userSelectedData } from '@/redux/selectors/userSelectors';

type Values = {
  username: string;
};
const formValidationSchema = Yup.object({
  // email: Yup.string().required('Обязательное поле.').email('Введите корректный email'),
  username: Yup.string()
    .required('Обязательное поле.')
    .max(16, 'Максимум 16 символов в имени пользователя.')
    .min(2, 'Минимум 2 символа в именни пользователя'),
});
const ChangeUserName = () => {
  const { isLoading, userName } = useAppSelector(userSelectedData);
  const dispatch = useAppDispatch();
  const onSubmit = async (value: Values) => {
    const res = await changeUserName(value.username);
    if (!res.ok) {
      return toast.error(res.message);
    }
    dispatch(changeUserFields({ username: value.username }));
    toast.success(res.message);
  };
  const formik = useFormik({
    validationSchema: formValidationSchema,
    initialValues: {
      username: userName || '',
    },
    onSubmit,
    enableReinitialize: true,
  });
  // const [value, setValue] = useState(userName || '');
  // useEffect(() => {
  //   setValue(userName || '');
  // }, [userName]);
  return (
    <form onSubmit={formik.handleSubmit} style={{ marginBottom: 15 }}>
      {isLoading ? (
        <InputLoader />
      ) : (
        <>
          <DefaultInput
            name="username"
            id="username"
            placeholder="Имя пользователя"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <div style={{ padding: 5, color: 'red', fontSize: 13 }}>{formik.errors.username}</div>
          {userName !== formik.values.username && (
            <BlueBtn disabled={formik.isSubmitting} style={{ marginTop: 15 }} type="submit">
              {!formik.isSubmitting ? (
                'Сохранить имя'
              ) : (
                <Image
                  // className={s.signUpPage_submit_loader}
                  src={circleTube}
                  height={20}
                  width={20}
                  alt="Loading..."
                />
              )}
            </BlueBtn>
          )}
        </>
      )}
    </form>
  );
};

export default ChangeUserName;
