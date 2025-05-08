import React, { useState } from 'react';
import PostImgDropBox from '../PostImgDropBox/PostImgDropBox';
import s from './PostCreateForm.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createNewPost } from '@/actions/post';
import { toast } from 'react-toastify';
import PostInput from '../PostFields/PostInput/PostInput';
import PostTextArea from '../PostFields/PostTextarea/PostTextarea';
type Values = {
  title: string;
  content: string;
};
const formValidationSchema = Yup.object({
  title: Yup.string()
    .required('Обязательное поле')
    .min(5, 'Минимум 5 символов')
    .max(60, 'Максимум 60 символов')
    .matches(/^[a-zA-Zа-яА-Я0-9\s.,!?-]+$/, 'Только буквы, цифры и знаки препинания'),
  content: Yup.string()
    .required('Обязательное поле')
    .min(20, 'Минимум 20 символов')
    .test(
      'not-whitespace',
      'Контент не может состоять только из пробелов',
      (value) => value.trim().length > 0,
    ),
});

const PostCreateForm = () => {
  const [postImg, setPostImg] = useState<string>('');

  const onChangeTextArea:React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      formik.handleChange(e)
    e.target.style.height = '';
    e.target.style.height =  e.target.scrollHeight>500 ? '500px' : e.target.scrollHeight + 'px';
  };

  const onSubmit = async (values: Values) => {
    const createPostData = {
      ...values,
      image_url: postImg,
    };
    const res = await createNewPost(createPostData);
    if (!res.ok) {
      return toast.error(res.message);
    }
    toast.success(res.message);
  };

  const formik = useFormik({
    validationSchema: formValidationSchema,
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit,
  });

  return (
    <div className={s.postCreateForm}>
      <PostImgDropBox />
      <form onSubmit={formik.handleSubmit}>
        <div className={s.postCreateForm_field}>

        <label htmlFor='title'>
        <span>Заголовок</span>
        <PostInput
          name="title"
          id="title"
          placeholder="Заголовок"
          value={formik.values.title}
          onChange={formik.handleChange}
          type="text"
        />

        </label>
        </div>
        <div className={s.postCreateForm_field}>

        <label htmlFor='content'>
        <span>Основной текст</span>
        <PostTextArea
          name="content"
          id="content"
          placeholder="Текст поста"
          value={formik.values.content}
          onChange={onChangeTextArea}
          type="text"
        />
        </label>
        </div>
        <button disabled={formik.isSubmitting}>Создать пост</button>
      </form>
    </div>
  );
};

export default PostCreateForm;
