'use client';
import React from 'react';
import s from './LoginPage.module.scss';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthFormField from '@/components/UI/Formik/AuthFormField/AuthFormField';
import Link from 'next/link';
import cn from 'classnames';

const formValidationSchema = Yup.object({
  email: Yup.string().required('Обязательное поле.').email('Введите корректный email'),
  password: Yup.string().max(16, 'Максимум 16 символов в пароле.').required('Обязательное поле.'),
});

interface Values {
  email: string;
  password: string;
}

const LoginPage = () => {
  const initialValues: Values = {
    email: '',
    password: '',
  };
  const onSubmit = (values: Values, helpers: FormikHelpers<Values>) => {
    console.log(values);
    helpers.setSubmitting(false);
  };
  return (
    <div className={s.loginPage}>
      <div className={s.loginPage_formBlock}>
        <h1 className={s.loginPage_title}>Вход</h1>
        <Formik
          validationSchema={formValidationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}>
          {(formik) => (
            <Form className={s.loginPage_form}>
              <AuthFormField placeholder="Ваша email" label="Email" type="email" name="email" />
              <AuthFormField
                placeholder="Ваша пароль"
                label="Пароль"
                type="password"
                name="password"
              />
              <button type="submit" disabled={formik.isSubmitting} className={s.loginPage_submit}>
                Войти
              </button>
              <Link href={'forgot'} className={cn(s.loginPage_links, s.loginPage_forgot)}>
                Забыли пароль?
              </Link>
              <div className={s.loginPage_signup}>
                <Link href={'/signup'} className={cn(s.loginPage_links)}>
                  <span>
                    Нет аккаунта?{' '}
                    <span style={{ color: 'rgb(118,212,255)' }}>Зарегистрируйся сейчас</span>
                  </span>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
