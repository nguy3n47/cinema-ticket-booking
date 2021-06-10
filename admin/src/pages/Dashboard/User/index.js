import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axiosClient from '../../../api/axiosClient';
import DataTable from './components/Tables/DataTable';
function User() {
  const [users, setUsers] = useState([]);

  const fetchDataUsers = async () => {
    const response = await axiosClient.get('/users');
    setUsers(response);
  };

  useEffect(() => {
    fetchDataUsers();
  }, []);

  return (
    <div className="content">
      <Row>
        <Col>
          <h1 className="text-center">Users</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable users={users} />
        </Col>
      </Row>
    </div>
  );
}

export default User;
