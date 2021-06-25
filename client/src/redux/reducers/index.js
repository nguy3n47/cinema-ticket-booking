import { combineReducers } from 'redux';
import authReducer from './authReducer';
import movieReducer from './movieReducer';
import showtimeReducer from './showtimeReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  movie: movieReducer,
  showtime: showtimeReducer,
  booking: bookingReducer,
});

export default rootReducer;
