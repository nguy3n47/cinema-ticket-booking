import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import cineplexReducer from './cineplexReducer';
import cinemaReducer from './cinemaReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  cineplex: cineplexReducer,
  cinema: cinemaReducer,
});

export default rootReducer;
