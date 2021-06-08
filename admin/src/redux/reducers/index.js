import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import cineplexReducer from './cineplexReducer';
import cinemaReducer from './cinemaReducer';
import showtimeReducer from './showtimeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  cineplex: cineplexReducer,
  cinema: cinemaReducer,
  showtime: showtimeReducer,
});

export default rootReducer;
