import React, { useState } from 'react';
import PostImgDropBox from '../PostImgDropBox/PostImgDropBox';
import s from './PostCreateForm.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createNewPost } from '@/actions/post';
import { toast } from 'react-toastify';
import PostInput from '../PostFields/PostInput/PostInput';
import PostTextArea from '../PostFields/PostTextarea/PostTextarea';
import { storage } from '@/firebase/firebase';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { createUniqueName } from '@/utils/createUniqueName';
import Image from 'next/image';
import cicleTube from '@/public/circleTube.svg';

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
  const [postImgFile, setPostImgFile] = useState<File | null>(null);

  const onChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    formik.handleChange(e);
    e.target.style.height = '';
    e.target.style.height = e.target.scrollHeight > 500 ? '500px' : e.target.scrollHeight + 'px';
  };
  const uploadPostImg = async (file: File | null) => {
    if (!file) {
      return null;
    }
    try {
      const imageRef = ref(storage, `images/${createUniqueName(file)}`);
      const uploadTask = uploadBytesResumable(imageRef, file);
      const fileUrl = new Promise<StorageError | string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            // setUploadProgress(progress);
          },
          (error) => {
            console.error('Error uploading file: ', error);
            reject(error);
          },
          async () => {
            const url = await getDownloadURL(imageRef);
            console.log('File uploaded successfully: ' + url);
            resolve(url);
          },
        );
      });
      const payload = await fileUrl;
      if (payload instanceof StorageError) {
        toast.error('Ошибка при отправке изображения в хранилище');
        return null;
      }

      return payload;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        return null;
      }
      toast.error('Неизвестная ошибка при сохранении изображения');
      return null;
    }
  };
  const onSubmit = async (values: Values) => {
    toast.info('Пост создается')
    const image_url =  await uploadPostImg(postImgFile)
    const createPostData:Values & { image_url?:string } = {
      ...values,
    };
    if(image_url) createPostData.image_url = image_url;
    const res = await createNewPost(createPostData);
    if (!res.ok) {
      return toast.error(res.message);
    }
    toast.success(res.message);
    formik.resetForm();
    setPostImgFile(null)
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
      <PostImgDropBox
        postImgFile={postImgFile}
        setPostImgFile={(file: File | null) => setPostImgFile(file)}
      />
      <form className={s.postCreateForm_form} onSubmit={formik.handleSubmit}>
        <div className={s.postCreateForm_fieldWrapper}>
          <div className={s.postCreateForm_field}>
            <label htmlFor="title">
              <span className={s.postCreateForm_labelText}>Заголовок</span>
              <PostInput
                name="title"
                id="title"
                placeholder="Заголовок"
                value={formik.values.title}
                onChange={formik.handleChange}
                type="text"
              />
            </label>
            {<div className={s.postCreateForm_error}>{formik.errors.title}</div>}
          </div>
          <div className={s.postCreateForm_field}>
            <label htmlFor="content">
              <span className={s.postCreateForm_labelText}>Основной текст</span>
              <PostTextArea
                rows={4}
                name="content"
                id="content"
                placeholder="Текст поста"
                value={formik.values.content}
                onChange={onChangeTextArea}
              />
            </label>
            {<div className={s.postCreateForm_error}>{formik.errors.content}</div>}
          </div>
        </div>
        <button type="submit" className={s.postCreateForm_button} disabled={formik.isSubmitting}>
          {!formik.isSubmitting ? (
            'Создать пост'
          ) : (
            <Image className={s.postCreateForm_btnLoading} src={cicleTube} height={20} width={20} alt="Создание..." />
          )}
        </button>
      </form>
    </div>
  );
};

export default PostCreateForm;
