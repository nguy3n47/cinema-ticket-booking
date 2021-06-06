import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ModalForm from './components/Modals/Modal';
import DataTable from './components/Tables/DataTable';
import { getCineplexsSelector } from '../../../redux/selectors/cineplexSelector';
import { getAllCineplexs } from '../../../redux/actions/cineplexActions';

function Cineplex() {
  const cineplexs = useSelector(getCineplexsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCineplexs());
  }, [dispatch]);

  return (
    <div className="content">
      <Row>
        <Col>
          <h1 className="text-center">Cineplexs</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ModalForm isShow={false} method="add" title="Add New Cineplex" />
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable cineplexs={cineplexs} />
        </Col>
      </Row>
    </div>
  );
}

export default Cineplex;
