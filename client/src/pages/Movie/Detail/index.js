import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieBySlugSelector } from '../../../redux/selectors/movieSelector';
import { getMovieBySlugAction } from '../../../redux/actions/movieActions';
import _ from 'lodash';
import moment from 'moment';

function MovieDetail() {
  const { slug } = useParams();
  const movie = useSelector(getMovieBySlugSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getMovieBySlugAction(slug, history));
  }, [dispatch, slug, history]);

  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = _.isEmpty(movie) ? '' : getYoutubeVideoId(movie.trailer);

  return (
    <main className="flex-shrink-0">
      <Container className="w-60">
        <Row>
          <Col xs={3} className="d-flex justify-content-center">
            <Image src={movie.poster} height={330}></Image>
          </Col>
          <Col>
            <div>
              <h5 className="fw-bold">{movie.title}</h5>
            </div>
            <hr className="my-1" />
            <div>
              <span className="fw-bold">Đạo diễn: </span>
              <span>{movie.director}</span>
            </div>
            <div>
              <span className="fw-bold">Diễn viên: </span>
              <span>{movie.actor}</span>
            </div>
            <div>
              <span className="fw-bold">Thể loại: </span>
              <span>{movie.genre}</span>
            </div>
            <div>
              <span className="fw-bold">Khởi chiếu: </span>
              <span>{moment(movie.release_date).format('DD/MM/YYYY')}</span>
            </div>
            <div>
              <span className="fw-bold">Thời lượng: </span>
              <span>{movie.running_time} phút</span>
            </div>
            <div>
              <span className="fw-bold">Ngôn ngữ: </span>
              <span>Tiếng Anh - Phụ đề Tiếng Việt</span>
            </div>
            <div className="mt-3">
              <button type="button" className="btn btn-primary color-primary">
                <div className="d-flex">
                  <span className="me-1">Mua vé</span>
                  <span>
                    <i className="bi bi-wallet2"></i>
                  </span>
                </div>
              </button>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <p className="px-0 mb-0">{movie.description}</p>
        </Row>
        <Row className="mt-2 text-center">
          <iframe
            className="px-0 mb-0"
            title={movie.title}
            controls
            height="444"
            allowFullScreen
            src={`https://www.youtube.com/embed/${videoId}`}
          />
        </Row>
      </Container>
    </main>
  );
}

export default MovieDetail;
