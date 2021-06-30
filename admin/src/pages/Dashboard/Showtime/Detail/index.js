import React, { useEffect, useLayoutEffect } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { Redirect } from 'react-router';
import moment from 'moment';
import DataTable from './Tables/DataTable';
import ModalForm from '../components/Modals/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getCineplexsSelector } from '../../../../redux/selectors/cineplexSelector';
import { getShowtimesSelector } from '../../../../redux/selectors/showtimeSelector';
import { getAllCineplexs } from '../../../../redux/actions/cineplexActions';
import { getAllShowtimesByMovieId } from '../../../../redux/actions/showtimeActions';

function DetailPage(props) {
  const { movie } = props.location.state ? props.location.state : {};
  const showtimes = useSelector(getShowtimesSelector);
  const cineplexs = useSelector(getCineplexsSelector);
  const dispatch = useDispatch();

  const ScrollToTopOnMount = () => {
    useLayoutEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return null;
  };

  useEffect(() => {
    dispatch(getAllShowtimesByMovieId({ movie_id: movie?.id }));
    dispatch(getAllCineplexs());

    return () => {
      dispatch({ type: 'REMOVE_ALL_SHOWTIMES' });
    };
  }, [dispatch, movie]);

  if (!movie) {
    return <Redirect to="/dashboard/showtimes" />;
  }

  return (
    <Row>
      <ScrollToTopOnMount />
      <Col md={3}>
        <Form.Group>
          <Image src={movie?.poster} fluid />
        </Form.Group>

        <Form.Group className="mt-1">
          <h2 className="text-center">{movie?.title}</h2>
        </Form.Group>

        <Form.Group>
          <h3 className="text-center">
            {moment(movie?.release_date).format('DD/MM/YYYY')}
          </h3>
        </Form.Group>

        <Form.Group>
          <p className="text-center">{movie?.running_time} minutes</p>
        </Form.Group>

        <Form.Group>
          <p className="text-center">
            {movie?.state === 'now-showing' ? 'Now Showing' : 'Coming Soon'}
          </p>
        </Form.Group>
      </Col>
      <Col>
        <ModalForm
          cineplexs={cineplexs}
          isShow={false}
          method="add"
          title="Add New Showtime"
        />
        <DataTable cineplexs={cineplexs} showtimes={showtimes} />
      </Col>
    </Row>
  );
}

export default DetailPage;
