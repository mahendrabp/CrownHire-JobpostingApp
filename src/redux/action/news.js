import axios from 'axios';

export const getNewsRedux = () => {
  return {
    type: 'GET_NEWS',
    payload: axios.get(
      `https://newsapi.org/v2/top-headlines?country=id&category=business&apiKey=5d292d5fca5f446f89a2a279aec88376`,
    ),
  };
};
