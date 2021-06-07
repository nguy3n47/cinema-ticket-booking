import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from './components/Modals/Modal';
import DataTable from './components/Tables/DataTable';
import {
  getCinemasSelector,
  getCinemaTypesSelector,
} from '../../../redux/selectors/cinemaSelector';
import { getAllCinemas, getCinemaTypes } from '../../../redux/actions/cinemaActions';
import { getCineplexsSelector } from '../../../redux/selectors/cineplexSelector';
import { getAllCineplexs } from '../../../redux/actions/cineplexActions';

function Cinema() {
  const cinemas = useSelector(getCinemasSelector);
  const cinemaTypes = useSelector(getCinemaTypesSelector);
  const cineplexs = useSelector(getCineplexsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCinemas());
    dispatch(getAllCineplexs());
    dispatch(getCinemaTypes());
  }, [dispatch]);

  return (
    <div className="content">
      <Row>
        <Col>
          <h1 className="text-center">Cinemas</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalForm
            isShow={false}
            cineplexs={cineplexs}
            cinemaTypes={cinemaTypes}
            method="add"
            title="Add New Cinema"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable cinemaTypes={cinemaTypes} cinemas={cinemas} cineplexs={cineplexs} />
        </Col>
      </Row>
    </div>
  );
}

export default Cinema;
