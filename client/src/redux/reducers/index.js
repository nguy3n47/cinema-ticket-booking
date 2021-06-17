import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';

const rootReducer = combineReducers({ auth: authReducer, movie: movieReducer });

export default rootReducer;
