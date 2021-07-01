import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userGetBookingAction } from '../../redux/actions/bookingActions';
import { getUserSelector } from '../../redux/selectors/authSelector';
import { userGetBookingSelector } from '../../redux/selectors/bookingSelector';

function History() {
  const user = useSelector(getUserSelector);
  const bookings = useSelector(userGetBookingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetBookingAction());
    return () => {
      dispatch({
        type: 'REMOVE_USER_BOOKINGS',
      });
    };
  }, [dispatch]);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="flex-shrink-0">
      <Container className="w-50">
        <Row>
          <h3 className="text-center">LỊCH SỬ ĐẶT VÉ</h3>
        </Row>
        <Row className="mt-3">
          <Col className="ps-3 pe-0">
            <hr />
          </Col>
        </Row>
        {bookings.length === 0 ? (
          ''
        ) : (
          <>
            {bookings.map((booking, i) => {
              const barcode = `https://www.barcodesinc.com/generator/image.php?code=${booking.b_number}&style=196&type=C128B&width=180&height=60&xres=1&font=16`;
              return (
                <React.Fragment key={i}>
                  <Row className="mt-3">
                    <Col md={3} className="px-3">
                      <Image
                        className="img-cover w-100"
                        src={booking.Showtime.Movie.poster}
                        height={260}
                      />
                    </Col>
                    <Col className="px-0">
                      <div>
                        <h5 className="fw-bold">
                          {booking.Showtime.Movie.title} ({booking.Showtime.Cinema.CinemaType.name})
                        </h5>
                      </div>
                      <hr className="my-1" />
                      <div>
                        <span>Mã đặt vé: </span>
                        <span className="fw-bold">{booking.b_number}</span>
                        <span> | </span>
                        <span> Thời gian đặt vé: </span>
                        <span className="fw-bold">
                          {moment(booking.createdAt).format('DD/MM/YYYY - HH:mm A')}
                        </span>
                      </div>
                      <div>
                        <span>Suất chiếu: </span>
                        <span className="fw-bold">
                          {moment(booking.Showtime.start_time).format('DD/MM/YYYY')}
                          {' - '}( {moment(booking.Showtime.start_time).format('HH:mm A')}
                          {' ~ '}
                          {moment(booking.Showtime.end_time).format('HH:mm A')} )
                        </span>
                      </div>
                      <div>
                        <span>Rạp: </span>
                        <span className="fw-bold">{booking.Showtime.Cinema.Cineplex.name}</span>
                      </div>
                      <div>
                        <span>Phòng chiếu: </span>
                        <span className="fw-bold">{booking.Showtime.Cinema.name}</span>
                      </div>
                      <div>
                        <span>Ghế: </span>
                        <span className="fw-bold">
                          {booking.Tickets.map((ticket, i) => {
                            return i === 0 ? ticket.seat_code : ', ' + ticket.seat_code;
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="fw-bold">Tổng cộng: </span>
                        <span className="fw-bold">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(booking.total)}
                        </span>
                      </div>
                      <div>
                        <Image className="img-cover" src={barcode} height={80} width={330} />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className="ps-3 pe-0">
                      <hr />
                    </Col>
                  </Row>
                </React.Fragment>
              );
            })}
          </>
        )}
      </Container>
    </main>
  );
}

export default History;
