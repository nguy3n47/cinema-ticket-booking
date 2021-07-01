import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Redirect, Link } from 'react-router-dom';
import { getAllMoviesByStateAction } from '../../redux/actions/movieActions';
import { getMoviesSelector } from '../../redux/selectors/movieSelector';
import { Container, Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';

function Movie() {
  const { state } = useParams();
  const movies = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesByStateAction({ state: state }));

    return () => {
      dispatch({
        type: 'REMOVE_MOVIES',
      });
    };
  }, [dispatch, state]);

  if (state !== 'now-showing' && state !== 'coming-soon') {
    return <Redirect to="/movies/now-showing" />;
  }

  const MovieList = React.memo(({ data }) => (
    <main className="flex-shrink-0">
      <Container className="w-60">
        <h3 className="text-center">
          {state === 'now-showing' ? 'PHIM ĐANG CHIẾU' : 'PHIM SẮP CHIẾU'}
        </h3>
        <Row md={4}>
          {data.map((item, i) => {
            const url = '/movies/detail/' + item.slug;
            return (
              <Col className="d-flex align-items-end flex-column mt-3" key={i}>
                <Row className="movie-item">
                  <Link className="movie-item-link" to={url}>
                    <Image className="movie-poster" src={item.poster} width={220} height={350} />
                    <h3 className="fw-bold fs-movie-title mt-2">{item.title}</h3>
                  </Link>
                </Row>
                <Row className="mt-auto">
                  <div className="px-0">
                    <span className="mt-1 text-line">
                      <span className="fw-bold ">Thể loại: </span>
                      {item.genre}
                    </span>
                  </div>
                  <div className="px-0">
                    <span className="fw-bold mt-1">Thời lượng: </span>
                    <span>{item.running_time} phút</span>
                  </div>
                  <div className="px-0">
                    <span className="fw-bold mt-1">Khởi chiếu: </span>
                    <span> {moment(item.release_date).format('DD/MM/YYYY')}</span>
                  </div>
                </Row>
              </Col>
            );
          })}
        </Row>
      </Container>
    </main>
  ));

  return <MovieList data={movies} />;
}

export default Movie;
