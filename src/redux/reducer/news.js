const initialState = {
  news: [],
  isError: '',
  isLoading: '',
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_NEWS_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_NEWS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'GET_NEWS_FULFILLED':
      // console.log(action.payload.data);
      return {
        ...state,
        isloading: false,
        news: action.payload.data.articles,
      };

    default: {
      return state;
    }
  }
};

export default news;
