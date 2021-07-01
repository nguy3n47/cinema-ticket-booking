import React, { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieBySlugSelector } from '../../../redux/selectors/movieSelector';
import { getMovieBySlugAction } from '../../../redux/actions/movieActions';
import moment from 'moment';
import ModalForm from '../components/ModalForm';

function MovieDetail() {
  const { slug } = useParams();
  const movie = useSelector(getMovieBySlugSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const getYoutubeVideoId = (url) => {
    if (!url) {
      return null;
    }

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const VideoIframe = React.memo(({ src, height }) => (
    <iframe
      className="px-0 mb-0"
      title={movie.title}
      controls
      height={height}
      allowFullScreen
      src={src}
    />
  ));

  const ScrollToTopOnMount = () => {
    useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return null;
  };

  useEffect(() => {
    dispatch(getMovieBySlugAction(slug, history));

    return () => {
      dispatch({
        type: 'REMOVE_MOVIE_DETAIL',
      });
    };
  }, [dispatch, slug, history]);

  return (
    <main className="flex-shrink-0">
      <ScrollToTopOnMount />
      <Container className="w-60">
        <Row>
          <Col md={3} className="px-0">
            <div>
              <Image src={movie.poster} height={345} className="img-cover w-100"></Image>
            </div>
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
            {/* <div>
              <span className="fw-bold">Ngôn ngữ: </span>
              <span>Tiếng Anh - Phụ đề Tiếng Việt</span>
            </div> */}
            {movie.state === 'now-showing' ? (
              <div className="mt-2">
                <ModalForm movie={movie} isShow={false} />
              </div>
            ) : (
              ''
            )}
          </Col>
        </Row>
        <Row className="mt-2">
          <p className="px-0 mb-0">{movie.description}</p>
        </Row>
        <Row className="mt-2 text-center">
          <VideoIframe
            height={444}
            src={`https://www.youtube.com/embed/${getYoutubeVideoId(movie.trailer)}`}
          />
        </Row>
      </Container>
    </main>
  );
}

export default MovieDetail;
