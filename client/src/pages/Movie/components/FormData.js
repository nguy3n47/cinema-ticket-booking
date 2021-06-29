import moment from 'moment';
import React, { useEffect } from 'react';
import { Form, Row } from 'react-bootstrap';
import $ from 'jquery';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { getMovieShowtimesAction } from '../../../redux/actions/movieActions';
import { Link } from 'react-router-dom';

function FormData(props) {
  const { movieId, data } = props;
  const dispatch = useDispatch();

  var timeFrom = (X) => {
    var dates = [];
    for (let I = 0; I < Math.abs(X); I++) {
      const day = new Date(
        new Date().getTime() - (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
      ).toISOString();

      dates.push(moment(day).format());
    }
    return dates;
  };

  const days = timeFrom(-9);

  const onChangeDay = (value) => {
    dispatch({
      type: 'GET_MOVIE_SHOWTIMES_FAIL',
    });

    dispatch(
      getMovieShowtimesAction(movieId, {
        day: value,
      })
    );
  };

  useEffect(() => {
    $('.box-day').click(function () {
      $('.box-day').removeClass('box-active');
      $(this).addClass('box-active');
    });
  });

  return (
    <Form>
      <Row>
        <Form.Group>
          <div className="row row-cols-auto mx-auto d-flex justify-content-between">
            {days.map((day, i) => {
              return (
                <div
                  key={i}
                  onClick={() => onChangeDay(moment(day).format('YYYY-MM-DD'))}
                  className={i === 0 ? 'box-day box-active' : 'box-day'}>
                  <span>{moment(day).format('M')}</span>
                  <em>{moment(day).format('ddd')}</em>
                  <strong>{moment(day).format('D')}</strong>
                </div>
              );
            })}
          </div>
          <hr className="my-3" />
        </Form.Group>
        {data.map((item, i) =>
          item.showtimes.length > 0 ? (
            <Form.Group key={i}>
              <strong>{item.name}</strong>
              <div className="container text-center">
                <div className="row row-cols-auto d-flex flex-wrap">
                  {item.showtimes.map((showtime) => {
                    const hashId = CryptoJS.MD5(showtime.start_time).toString() + showtime.id;
                    return (
                      <Link
                        to={`/booking/tickets/${hashId}`}
                        key={showtime.id}
                        className="text-link px-0">
                        <div id={showtime.id} className="col box-text">
                          {moment(showtime.start_time).format('HH:mm A')}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              <hr className="my-3" />
            </Form.Group>
          ) : (
            ''
          )
        )}
      </Row>
    </Form>
  );
}

export default FormData;
