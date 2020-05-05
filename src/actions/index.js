import axios from 'axios';
import qs from 'qs';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const onRegister = (values, history) => async (dispatch) => {
  console.log(values);
  //const res = await axios.post('http://localhost:8000/api/user/create', values);
  const res = await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/user/create',
    data: qs.stringify({
      username: values['username'],
      password: values['password'],
      email: values['email'],
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  console.log(res);
  //   history.push('/home');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const onLogin = (values, history) => async (dispatch) => {
  console.log(values);
  //const res = await axios.post('http://localhost:8000/api/user/create', values);
  const res = await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/user/create',
    data: qs.stringify({
      username: values['username'],
      password: values['password'],
      email: values['email'],
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  console.log(res);
  //   history.push('/home');
  dispatch({ type: FETCH_USER, payload: res.data });
};
