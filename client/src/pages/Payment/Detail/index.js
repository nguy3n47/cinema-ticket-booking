import React from 'react';
import { useLocation, Redirect, useParams } from 'react-router-dom';
import { Image, Container, Row } from 'react-bootstrap';
import moment from 'moment';

function PaymentDetail() {
  const location = useLocation();
  const { id } = useParams();
  const barcode = `https://www.barcodesinc.com/generator/image.php?code=${id}&style=196&type=C128B&width=600&height=80&xres=1&font=16`;

  if (!location.state) {
    return <Redirect to="/" />;
  }

  const { showtime = {}, booking = {} } = location.state;

  return (
    <main className="flex-shrink-0">
      <Container className="w-75">
        <Row>
          <div className="d-flex align-items-center justify-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="65"
              height="65"
              fill="#4CAF50"
              className="bi bi-check2-circle"
              viewBox="0 0 16 16">
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
            </svg>
            <h3 className="text-center">ĐẶT VÉ THÀNH CÔNG #{id}</h3>
          </div>
          <Image src={barcode}></Image>
        </Row>
        <Row className="mt-3">
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center w-320">
              <div>
                <Image className="booking-movie-img" src={showtime.Movie.poster} />
              </div>
              <div className="ms-1">
                <p className="fw-bold mb-0">{showtime.Movie.title}</p>
                <p className="mb-0 text-break">{showtime.Movie.genre}</p>
                <p className="mb-0">{showtime.Cinema.CinemaType.name}</p>
              </div>
            </div>
            <div className="d-flex justify-content-center mx-5">
              <div>
                <p className="mb-1">Rạp</p>
                <p className="mb-1">Suất Chiếu</p>
                <p className="mb-1">Phòng Chiếu</p>
                {booking.seats.length > 0 ? <p className="mb-1">Giá vé</p> : ''}
                {booking.seats.length > 0 ? <p className="mb-1">Ghế</p> : ''}
              </div>
              <div className="ms-1">
                <p className="fw-bold mb-1 ms-2">{showtime.Cinema.Cineplex.name}</p>
                <p className="fw-bold mb-1 ms-2">
                  {moment(showtime.start_time).format('DD/MM/YYYY')}
                  {' - '}( {moment(showtime.start_time).format('HH:mm A')}
                  {' ~ '}
                  {moment(showtime.end_time).format('HH:mm A')} )
                </p>
                <p className="fw-bold mb-1 ms-2">{showtime.Cinema.name}</p>
                {booking.seats.length > 0 ? (
                  <p className="fw-bold mb-1 ms-2 w-320">
                    {booking.seats.length} x{' '}
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                      showtime.price
                    )}
                  </p>
                ) : (
                  ''
                )}
                {booking.seats.length > 0 ? (
                  <p className="fw-bold mb-1 ms-2 w-320">
                    {booking.seats.map((seat, i) => {
                      return i === 0 ? seat : ', ' + seat;
                    })}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div>
                <p className="fw-bold mb-1">Tổng tiền</p>
                <p className="fw-bold mb-1">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    booking.total
                  )}
                </p>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </main>
  );
}

export default PaymentDetail;
