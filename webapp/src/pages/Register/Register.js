import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import doRegister from './doRegister';
import { setAccountLoggedIn, setName, setToken, setUsername } from '../../redux/userSlice';

const schema = Joi.object({
  fullname: Joi.string().required().min(3),
  username: Joi.string().required().regex(/^[a-zA-Z0-9_-]{3,16}$/),
  password: Joi.string().required().min(6),
  confirmPassword: Joi.string().required().valid(Joi.ref('password'))
});

const Register = () => {
  const dispatch = useDispatch();
  const [failure, setFailure] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });

  const history = useHistory();

  const submitHandler = async ({ username, password, fullname }) => {
    const result = await doRegister(username, password, fullname);
    if (result === null) {
      setFailure(true);
      return;
    }

    if (result.isSuccessful === false) {
      console.log('------')
      console.log(result.message);
      setFailure(true);
      return;
    }

    dispatch(setUsername(username));
    dispatch(setName(fullname));
    dispatch(setToken(result.token));
    dispatch(setAccountLoggedIn(true));
    history.replace('/');
  }

  return (
    <div className="login-box">
      <h1 className="login-header">
        Register in News App
      </h1>
      <div className="login-inputs-container">
        <form onSubmit={handleSubmit((data) => submitHandler(data))}>
          <input
            className="input-main"
            autoComplete="off"
            {...register('fullname')}
            placeholder="full name"
          />
          <input
            className="input-main"
            autoComplete="off"
            {...register('username')}
            placeholder="username"
          />
          <input
            className="input-main"
            type="password"
            {...register('password')}
            placeholder="password"
          />
          <input
            className="input-main"
            type="password"
            {...register('confirmPassword')}
            placeholder="repeat password"
          />
          <button className="submit-button">Register</button>
          {
            !!errors.username
            && (<p className="error">enter a correct username.</p>)
          }
          {
            !!errors.fullname
            && (<p className="error">your name must be at least 3 characters.</p>)
          }

          {
            !!errors.password
            && (<p className="error">password must be at least 6 characters.</p>)
          }

          {
            !!errors.confirmPassword
            && (<p className="error">passwords are not equal.</p>)
          }

          {
            !!failure
            && (
              <p className="error">not successful.</p>
            )
          }

          {
            !!duplicate
            && (
              <p className="error">
                your username exists
              </p>
            )
          }

          <Link to="/Login">
            <p className="login-register-button" >
              login
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Register;
