import React from 'react';
import { Container, Row, Image } from 'react-bootstrap';
import Seats from './components/Seats';
import { useSelector } from 'react-redux';
import { getUserSelector } from '../../redux/selectors/authSelector';
import { useHistory } from 'react-router-dom';

function Booking() {
  const user = useSelector(getUserSelector);
  const history = useHistory();

  if (!user) {
    history.push('/login');
  }

  return (
    <main className="flex-shrink-0">
      <Container className="w-75">
        <Row>
          <h3 className="text-center">ĐẶT VÉ XEM PHIM</h3>
        </Row>
        <Row>
          <p className="fw-bold mb-0">CGV Aeon Mall Hải Phòng | Cinema 4 | Số ghế (105/145)</p>
          <p className="fw-bold mb-0">24/06/2021 11:30 ~ 24/06/2021 13:52</p>
        </Row>
        <Row className="mt-3">
          <Seats />
        </Row>
        <div className="row mt-3">
          <div className="col-1 previous-button">
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
              <Image
                className="booking-movie-img"
                src="https://www.cgv.vn/media/catalog/product/cache/1/thumbnail/dc33889b0f8b5da88052ef70de32f1cb/b/t/btdq_main_poster_2.jpg"
              />
            </div>
            <div className="ms-1">
              <p className="fw-bold mb-0">BAN TAY DIET QUY</p>
              <p className="mb-0">2D</p>
              <p className="mb-0">C18</p>
            </div>
          </div>
          <div className="col-4 px-0 d-flex justify-content-center">
            <div>
              <p className="fw-bold mb-1">Rạp</p>
              <p className="fw-bold mb-1">Suất Chiếu</p>
              <p className="fw-bold mb-1">Phòng Chiếu</p>
              <p className="fw-bold mb-1">Ghế</p>
            </div>
            <div className="col">
              <p className="mb-1 ms-2">CGV Vincom Center Landmark 81</p>
              <p className="mb-1 ms-2">23/06/2021 - 20:30 PM</p>
              <p className="mb-1 ms-2">Cinema 02</p>
              <p className="mb-1 ms-2">B6, B7, B8</p>
            </div>
          </div>
          <div className="col-2 text-end">
            <p className="fw-bold mb-1">Tổng tiền</p>
            <p className="fw-bold mb-1">11.392.000 ₫</p>
          </div>
          <div className="col-1 next-button">
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
  );
}

export default Booking;
