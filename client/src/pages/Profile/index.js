import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getUserSelector } from '../../redux/selectors/authSelector';
import { Container, Row, Image } from 'react-bootstrap';
import ModalForm from './components/ModalForm';
import moment from 'moment';

function Profile() {
  const user = useSelector(getUserSelector);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="flex-shrink-0">
      <Container className="w-60">
        <Row>
          <h3 className="text-center">THÔNG TIN CÁ NHÂN</h3>
        </Row>
        <div className="d-flex flex-column align-items-center mt-2">
          <Image className="img-cover rounded-circle" src={user.avatar} width={180} height={180} />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <div className="me-4">
            <div>Họ và tên: {user.fullname}</div>
            <div>Email: {user.email}</div>
          </div>
          <div className="ms-4">
            <div>Ngày sinh: {moment(user.birthday).format('DD/MM/YYYY')}</div>
            <div>Số điện thoại: {user.phone}</div>
          </div>
        </div>
        <div className="text-center">Địa chỉ: {user.address}</div>
        <div className="text-center mt-2">
          <ModalForm data={user} isShow={false} />
        </div>
      </Container>
    </main>
  );
}

export default Profile;
