import axios from 'axios';

const URI =
  'http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/users/';

export const loginUser = data => {
  return {
    type: 'LOGIN_USER',
    payload: axios.post(URI + 'login', data),
  };
};

export const registerUser = data => {
  return {
    type: 'REGISTER_USER',
    payload: axios.post(URI + 'register', data),
  };
};
