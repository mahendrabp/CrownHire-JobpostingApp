import axios from 'axios';
// import company from '../reducer/company';
export const getCategoryRedux = () => {
  return {
    type: 'GET_CATEGORY',
    payload: axios.get(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/categories`,
    ),
  };
};
