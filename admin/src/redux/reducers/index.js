import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import cineplexReducer from './cineplexReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  cineplex: cineplexReducer,
});

export default rootReducer;
