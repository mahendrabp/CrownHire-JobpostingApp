import {combineReducers} from 'redux';
import auth from './auth';
import job from './job';
import news from './news';

const appReducer = combineReducers({
  auth,
  job,
  news,
});

export default appReducer;
