import axios from 'axios';
// import company from '../reducer/company';
export const getCompanyRedux = () => {
  return {
    type: 'GET_COMPANY',
    payload: axios.get(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies`,
    ),
  };
};

export const addCompanyRedux = data => {
  return {
    type: 'ADD_COMPANY',
    payload: axios.post(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies`,
      data,
    ),
  };
};

export const updateCompanyRedux = (id, data) => {
  return {
    type: 'UPDATE_COMPANY',
    payload: axios.patch(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies/${id}`,
      data,
    ),
  };
};

export const deleteCompanyRedux = id => {
  return {
    type: 'DELETE_COMPANY',
    payload: axios.delete(
      `http://ec2-100-24-23-28.compute-1.amazonaws.com:8001/api/v1/companies/${id}`,
    ),
  };
};
