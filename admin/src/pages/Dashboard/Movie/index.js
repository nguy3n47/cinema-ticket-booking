import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import DataTable from './components/Tables/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesSelector } from '../../../redux/selectors/movieSelector';
import { getAllMovies } from '../../../redux/actions/movieActions';
import ModalForm from './components/Modals/Modal';

function Movie() {
  const movies = useSelector(getMoviesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  return (
    <div className="content">
      <Row>
        <Col>
          <h1 className="text-center">Movies</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalForm isShow={false} method="add" title="Add New Movie" />
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable movies={movies} />
        </Col>
      </Row>
    </div>
  );
}

export default Movie;
