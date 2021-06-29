import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import showtimeReducer from './showtimeReducer';
import bookingReducer from './bookingReducer';
import cineplexReducer from './cineplexReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  showtime: showtimeReducer,
  booking: bookingReducer,
  cineplex: cineplexReducer,
});

export default rootReducer;
