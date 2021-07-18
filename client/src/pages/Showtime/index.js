import CryptoJS from 'crypto-js';
import $ from 'jquery';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { getAllCineplexsAction } from '../../redux/actions/cineplexActions';
import {
  changeDayShowtimeAction,
  getAllShowtimesByCineplexAction,
} from '../../redux/actions/showtimeActions';
import { getCineplexsSelector } from '../../redux/selectors/cineplexSelector';
import { getAllShowtimesByCineplexSelector } from '../../redux/selectors/showtimeSelector';

function Showtime() {
  let cineplexs = useSelector(getCineplexsSelector);
  const data = useSelector(getAllShowtimesByCineplexSelector);
  const message = useSelector((state) => state.showtime.message);
  const movies = useSelector((state) => state.showtime.movies);

  const dispatch = useDispatch();

  let options = [];

  useEffect(() => {
    dispatch(getAllCineplexsAction());
    return () => {
      dispatch({
        type: 'REMOVE_CINEPLEXS',
      });
      dispatch({
        type: 'REMOVE_ALL_SHOWTIMES',
      });
    };
  }, [dispatch]);

  useEffect(() => {
    $('.box-day').click(function () {
      $('.box-day').removeClass('box-active');
      $(this).addClass('box-active');
    });
  });

  if (cineplexs.data.length > 0) {
    cineplexs.data.forEach((cineplex) => {
      const data = {
        value: cineplex.id,
        label: cineplex.name,
      };
      options.push(data);
    });
  }

  const handleChangeCineplexId = (item) => {
    dispatch(getAllShowtimesByCineplexAction({ cineplex_id: item.value }));
  };

  const onChangeDay = (obj) => {
    dispatch(changeDayShowtimeAction(obj));
  };

  return (
    <main className="flex-shrink-0">
      <Container className="w-75">
        <Row>
          <h3 className="text-center">LỊCH CHIẾU</h3>
        </Row>
        <Row style={{ paddingLeft: 150, paddingRight: 142 }}>
          <Form.Group className="ms-1">
            <Form.Label className="form-group required control-label">Chọn Cụm Rạp</Form.Label>
            <Select
              placeholder="CGV Cinemas"
              options={options}
              onChange={handleChangeCineplexId}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: '#d4d4d4',
                  primary: '#e71a0f',
                },
              })}
            />
          </Form.Group>
        </Row>
        <Row className="mt-3 ps-1" style={{ marginLeft: 150, paddingRight: 150 }}>
          <hr className="my-0" />
        </Row>
        <Row className="mt-3" style={{ paddingLeft: 150, paddingRight: 150 }}>
          <div className="fw-bold ms-1">{message}</div>
          {data.length > 0 ? (
            <Form.Group>
              <div className="row mx-auto d-flex">
                {data.map((item, i) => {
                  const day = moment(item.date, 'DD/MM/YYYY').toDate();
                  return (
                    <div
                      key={i}
                      onClick={() =>
                        onChangeDay({ id: i, value: moment(day).format('DD/MM/YYYY') })
                      }
                      className={i === 0 ? 'box-day box-active' : 'box-day'}>
                      <span>{moment(day).format('M')}</span>
                      <em>{moment(day).format('ddd')}</em>
                      <strong>{moment(day).format('D')}</strong>
                    </div>
                  );
                })}
              </div>
            </Form.Group>
          ) : (
            ''
          )}
        </Row>
        <Row className="mt-3 ps-1" style={{ marginLeft: 150, paddingRight: 150 }}>
          <hr className="my-0" />
        </Row>
        {movies.length > 0 ? (
          <>
            {movies.map((movie, i) => {
              const url = '/movies/detail/' + movie.slug;
              return (
                <React.Fragment key={i}>
                  <Row className="mt-3" style={{ paddingLeft: 150, paddingRight: 150 }}>
                    <Col md={3} className="px-3">
                      <Link className="movie-item-link" to={url}>
                        <Image
                          className="img-cover w-100 movie-poster"
                          src={movie.poster}
                          height={300}
                        />
                      </Link>
                    </Col>
                    <Col className="px-0">
                      <Link className="movie-item-link" to={url}>
                        <div className="movie-item">
                          <h5 className="fw-bold">{movie.title}</h5>
                        </div>
                      </Link>
                      <hr className="my-1" />
                      {movie.showtimes.map((showtime, s) => {
                        return (
                          <React.Fragment key={s}>
                            <div className={s === 0 ? '' : 'mt-3'}>
                              <h6 className="fw-bold">
                                {showtime.type_name === '2D'
                                  ? showtime.type_name + ' Phụ Đề Tiếng Việt'
                                  : showtime.type_name}
                              </h6>
                            </div>
                            <div>
                              <div className="row row-cols-auto mx-auto d-flex flex-wrap">
                                {showtime.list.map((item, l) => {
                                  const hashId = CryptoJS.MD5(item.start_time).toString() + item.id;
                                  return (
                                    <Link
                                      to={`/booking/tickets/${hashId}`}
                                      key={l}
                                      className="text-link px-0">
                                      <div id={item.id} className="col box-text">
                                        {moment(item.start_time).format('HH:mm A')}
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </Col>
                  </Row>
                  <Row className="mt-3 ps-1" style={{ marginLeft: 150, paddingRight: 150 }}>
                    <hr className="my-1" />
                  </Row>
                </React.Fragment>
              );
            })}
          </>
        ) : (
          ''
        )}
      </Container>
    </main>
  );
}

export default Showtime;
