import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import {
  setUsername,
  setName,
  setAccountLoggedIn,
  setToken,
  setAccountLoggedOut
} from '../../redux/userSlice';
import doLogin from './doLogin';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const schema = Joi.object({
  username: Joi.string().required().regex(/^[a-zA-Z0-9_-]{3,16}$/),
  password: Joi.string().required().min(6),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: joiResolver(schema)
  });
  const [failure, setFailure] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(setAccountLoggedOut());
  }, []);


  const submitHandler = async ({username, password}) => {
    const result = await doLogin(username, password);
    if (result === null) {
      setFailure(true);
      return;
    }

    if (!result.isSuccessful) {
      console.log(result.message);
      setFailure(true);
      return;
    }

    dispatch(setUsername(username));
    dispatch(setName(result.name));
    dispatch(setToken(result.token));
    dispatch(setAccountLoggedIn(true));
    history.replace('/');
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-header">Login to News App</h1>
        <form onSubmit={handleSubmit((data => submitHandler(data)))}>
          <div className="login-inputs-container">
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
            <button className="submit-button">login</button>

            {
              !!Object.keys(errors).length
              && (
                <p className="error">Wrong username.</p>
              )
            }

            {
              !!failure
              && (
                <p className="error">Wrong username or password.</p>
              )
            }

            <Link to="/Register">
              <p className="login-register-button">
                Register
              </p>
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
