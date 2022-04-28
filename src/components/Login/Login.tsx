import React from 'react';

import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import style from './Login.module.scss';

import { authType } from 'api/LoginApi';
import { isLoginThunk } from 'redux/LoginReducer';
import { selectIsLogin } from 'redux/Selectors';
import { useAppDispatch } from 'redux/Store';

type ValidErrorType = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

export const Login: React.FC = () => {
  const isLogin = useSelector(selectIsLogin);
  const dispatch = useAppDispatch();
  const formik = useFormik<authType>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: (values): {} => {
      const errors: ValidErrorType = {};
      const minLengthPassword = 3;
      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < minLengthPassword) {
        errors.password = 'Min length password 7';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: values => {
      dispatch(isLoginThunk(values));
    },
  });

  if (isLogin) {
    return <Navigate to="/userList" />;
  }

  return (
    <div className={style.ContainerLogin}>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <h2>
          Email: <span>free@samuraijs.com</span>
        </h2>
        <h2>
          Password: <span>free</span>
        </h2>
        <div className={style.formItem}>
          <label className={style.label} htmlFor="email">
            Email{' '}
          </label>
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
            onBlur={formik.handleBlur}
            type="email"
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: ' red' }}>{formik.errors.email}</div>
          )}
        </div>
        <div className={style.formItem}>
          <label className={style.label} htmlFor="password">
            Password{' '}
          </label>
          <input
            type="password"
            onBlur={formik.handleBlur}
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: ' red' }}>{formik.errors.password}</div>
          )}
        </div>
        <div className={style.formItemCheckbox}>
          <label className={style.label} htmlFor="remember Me">
            RememberMe{' '}
          </label>
          <input
            type="checkbox"
            checked={formik.values.rememberMe}
            id="rememberMe"
            name="rememberMe"
            onChange={formik.handleChange}
          />
        </div>
        <div className={style.buttonContainer}>
          <button aria-label="Save" value="Login" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
