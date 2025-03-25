'use client';
import { sendTokenToChangeEmail } from '@/actions/account';
import BlueBtn from '@/components/shared/BlueBtn/BlueBtn';
import DefaultInput from '@/components/shared/DefaultInput/DefaultInput';
import InputLoader from '@/components/UI/Loaders/InputLoader';
import { useAppSelector } from '@/hooks/reduxHooks';
import Image from 'next/image';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import circleTube from '@/public/circleTube.svg';
import { selectEmailVerify } from '@/redux/selectors/userSelectors';
import { useFormik } from 'formik';
type Values = {
  email: string;
};
const formValidationSchema = Yup.object({
  email: Yup.string().required('Обязательное поле.').email('Введите корректный email'),
});
const ChangeEmail = () => {
  const { isLoading, userEmail } = useAppSelector(selectEmailVerify);
  const onSubmit = async (values: Values) => {
    const res = await sendTokenToChangeEmail(values.email);
    if (!res.ok) {
      return toast.error(res.message);
    }
    toast.success(res.message);
  };
  const formik = useFormik({
    validationSchema: formValidationSchema,
    initialValues: {
      email: userEmail || '',
    },
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ marginBottom: 15 }}>
      {isLoading ? (
        <InputLoader />
      ) : (
        <>
          <DefaultInput
            id="email"
            name="email"
            placeholder="Email пользователя"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div style={{ padding: 5, color: 'red', fontSize: 13 }}>{formik.errors.email}</div>
          {formik.values.email !== userEmail && (
            <BlueBtn disabled={formik.isSubmitting} style={{ marginTop: 15 }} type="submit">
              {!formik.isSubmitting ? (
                'Сохранить email'
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

export default ChangeEmail;
