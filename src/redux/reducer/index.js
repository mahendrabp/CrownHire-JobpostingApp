import {combineReducers} from 'redux';
import auth from './auth';
import job from './job';
import news from './news';
import category from './category';
import company from './company';

const appReducer = combineReducers({
  auth,
  job,
  news,
  category,
  company,
});

export default appReducer;
