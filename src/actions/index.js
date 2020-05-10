import axios from 'axios';
import qs from 'qs';
import { FETCH_USER, PRICES } from './types';

export const fetchUser = () => async (dispatch) => {
  //const res = await axios.get('/api/current_user');

  const res = await axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/user/current',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  console.log(res);

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
  history.push('/');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const onLogin = (values, history) => async (dispatch) => {
  console.log(values);
  //const res = await axios.post('http://localhost:8000/api/user/create', values);
  const res = await axios({
    method: 'post',
    url: 'http://127.0.0.1:8000/api/token/obtain',
    data: qs.stringify({
      username: values['username'],
      password: values['password'],
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });
  localStorage.setItem('access_token', res.data.access);
  localStorage.setItem('refresh_token', res.data.refresh);
  console.log(res);
  console.log(localStorage);
  history.push('/home');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchPrices = () => async (dispatch) => {
  const res = await axios({
    method: 'get',
    url: 'http://127.0.0.1:8000/api/btc',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  dispatch({ type: PRICES, payload: res.data });
};
