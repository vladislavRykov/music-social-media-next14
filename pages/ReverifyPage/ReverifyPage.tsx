'use client';
import AuthPageLayout from '@/components/layout/AuthPageLayout/AuthPageLayout';
import AuthFormField from '@/components/UI/Formik/AuthFormField/AuthFormField';
import { Form, Formik, FormikHelpers } from 'formik';
import Image from 'next/image';
import React from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import circleTube from '@/public/circleTube.svg';
import s from './ReverifyPage.module.scss';
import { sendTokenToVerifyEmail } from '@/actions/auth';
import { toast } from 'react-toastify';

const ReverifyPage = () => {
  const formValidationSchema = Yup.object({
    email: Yup.string().required('Обязательное поле.').email('Введите корректный email'),
  });

  interface Values {
    email: string;
  }
  const initialValues: Values = {
    email: '',
  };

  const onSubmit = async (values: Values, helpers: FormikHelpers<Values>) => {
    const res = await sendTokenToVerifyEmail(values.email);
    if (!res.ok) {
      return res.message && toast.error(res.message);
    }
    toast.success(res?.message);
    helpers.resetForm();
  };
  return (
    <AuthPageLayout title="Отправить код подтверждение на email">
      <Formik
        validationSchema={formValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {(formik) => (
          <Form className={s.reverifyPage_form}>
            <AuthFormField placeholder="Ваш email" label="Email" type="email" name="email" />

            <button type="submit" disabled={formik.isSubmitting} className={s.reverifyPage_submit}>
              {formik.isSubmitting ? (
                <Image
                  className={s.reverifyPage_submit_loader}
                  src={circleTube}
                  height={20}
                  width={20}
                  alt="Loading..."
                />
              ) : (
                'Отправить'
              )}
            </button>
            <Link href={'/login'} className={s.reverifyPage_links}>
              Авторизироваться
            </Link>
          </Form>
        )}
      </Formik>
    </AuthPageLayout>
  );
};

export default ReverifyPage;
