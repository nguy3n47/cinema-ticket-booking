import React, { useEffect } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import { Redirect } from 'react-router';
import moment from 'moment';
import DataTable from './Tables/DataTable';
import ModalForm from '../components/Modals/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getCineplexsSelector } from '../../../../redux/selectors/cineplexSelector';
import { getAllCineplexs } from '../../../../redux/actions/cineplexActions';

function DetailPage(props) {
  const { movie } = props.location.state ? props.location.state : {};
  const cineplexs = useSelector(getCineplexsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCineplexs());
  }, [dispatch]);

  if (!movie) {
    return <Redirect to="/dashboard/showtimes" />;
  }

  return (
    <Row>
      <Col xs={6} md={3}>
        <Form.Group>
          <Image src={movie?.poster} fluid />
        </Form.Group>

        <Form.Group className="mt-1">
          <h3>{movie?.title}</h3>
        </Form.Group>

        <Form.Group>
          <p>{moment(movie?.release_date).format('DD/MM/YYYY')}</p>
        </Form.Group>

        <Form.Group>
          <p>{movie?.running_time} minutes</p>
        </Form.Group>

        <Form.Group>
          <p>{movie?.state === 'now-showing' ? 'Now Showing' : 'Coming Soon'}</p>
        </Form.Group>
      </Col>
      <Col>
        <ModalForm
          cineplexs={cineplexs}
          isShow={false}
          method="add"
          title="Add New Showtime"
        />
        <DataTable cineplexs={cineplexs} showtimes={movie.Showtimes} />
      </Col>
    </Row>
  );
}

export default DetailPage;
