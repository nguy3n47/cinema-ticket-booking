import _ from 'lodash';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { getShowtimeDetailAction } from '../../redux/actions/showtimeActions';
import { getUserSelector } from '../../redux/selectors/authSelector';
import {
  getResetSeatsSelector,
  getShowtimeDetailSelector,
} from './../../redux/selectors/showtimeSelector';
import Seats from './components/Seats';
import { getBookingSelector } from './../../redux/selectors/bookingSelector';

function Booking() {
  const { showtimeId } = useParams();

  const user = useSelector(getUserSelector);
  const showtime = useSelector(getShowtimeDetailSelector);
  const resetSeats = useSelector(getResetSeatsSelector);
  const booking = useSelector(getBookingSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const onPreviousButton = () => {
    history.goBack();
  };

  const onNextButton = () => {
    if (booking.seats.length === 0) {
      return alert('Vui lòng chọn ghế!');
    }
    history.push({ pathname: '/payment', state: { user, showtime, booking } });
  };

  useEffect(() => {
    dispatch(getShowtimeDetailAction(showtimeId, history));

    return () => {
      dispatch({
        type: 'REMOVE_SHOWTIME_DETAIL',
      });
      dispatch({
        type: 'REMOVE_BOOKING',
      });
    };
  }, [dispatch, showtimeId, history]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {_.isEmpty(showtime) ? (
        ''
      ) : (
        <main className="flex-shrink-0">
          <Container className="w-75">
            <Row>
              <h3 className="text-center">ĐẶT VÉ XEM PHIM</h3>
            </Row>
            <Row>
              <p className="fw-bold mb-0">
                {showtime.Cinema.Cineplex.name} | {showtime.Cinema.name} | Số ghế ({resetSeats}/
                {showtime.Cinema.horizontal_size * showtime.Cinema.vertical_size})
              </p>
              <p className="fw-bold mb-0">
                {moment(showtime.start_time).format('DD/MM/YYYY HH:mm A')} ~{' '}
                {moment(showtime.end_time).format('DD/MM/YYYY HH:mm A')}
              </p>
            </Row>
            <Seats data={showtime} booking={booking} />
            <div className="row mt-3">
              <div className="col-1 previous-button" onClick={onPreviousButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </div>
              <div className="col px-0 d-flex">
                <div>
                  <Image className="booking-movie-img" src={showtime.Movie.poster} />
                </div>
                <div className="ms-1">
                  <p className="fw-bold mb-0">{showtime.Movie.title}</p>
                  <p className="mb-0">{showtime.Movie.genre}</p>
                  <p className="mb-0">{showtime.Cinema.CinemaType.name}</p>
                </div>
              </div>
              <div className="col-4 px-0 ms-5 d-flex justify-content-center">
                <div>
                  <p className="mb-1">Rạp</p>
                  <p className="mb-1">Suất Chiếu</p>
                  <p className="mb-1">Phòng Chiếu</p>
                  {booking.seats.length > 0 ? <p className="mb-1">Giá vé</p> : ''}
                  {booking.seats.length > 0 ? <p className="mb-1">Ghế</p> : ''}
                </div>
                <div className="col">
                  <p className="fw-bold mb-1 ms-2">{showtime.Cinema.Cineplex.name}</p>
                  <p className="fw-bold mb-1 ms-2">
                    {moment(showtime.start_time).format('DD/MM/YYYY - HH:mm A')}
                  </p>
                  <p className="fw-bold mb-1 ms-2">{showtime.Cinema.name}</p>
                  {booking.seats.length > 0 ? (
                    <p className="fw-bold mb-1 ms-2">
                      {booking.seats.length} x{' '}
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(showtime.price)}
                    </p>
                  ) : (
                    ''
                  )}
                  {booking.seats.length > 0 ? (
                    <p className="fw-bold mb-1 ms-2">
                      {booking.seats.map((seat, i) => {
                        return i === 0 ? seat : ', ' + seat;
                      })}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="col-2 text-end px-0 me-1">
                <p className="fw-bold mb-1">Tổng tiền</p>
                <p className="fw-bold mb-1">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    booking.total
                  )}
                </p>
              </div>
              <div className="col-1 next-button" onClick={onNextButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16">
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />
                </svg>
              </div>
            </div>
          </Container>
        </main>
      )}
    </>
  );
}

export default Booking;
