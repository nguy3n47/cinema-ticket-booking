import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Image } from 'react-bootstrap';
import moment from 'moment';
import { updateProfileAction } from '../../../redux/actions/authActions';

function FormEdit(props) {
  const user = props.data;
  const [picture, setPicture] = useState(user?.avatar ? user?.avatar : null);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmitData = (data) => {
    let bodyFormData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'avatar') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    dispatch(updateProfileAction(bodyFormData));
    props.handleClose();
  };

  const onChangePicture = (e) => {
    if (e.target.files.length !== 0) {
      setPicture(URL.createObjectURL(e.target.files[0]));
    }
  };

  const isNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
  };

  return (
    <Form id="form-edit" onSubmit={handleSubmit(onSubmitData)}>
      <div className="d-flex flex-column align-items-center">
        <Image className="img-cover rounded-circle" src={picture} width={180} height={180} />
        <Form.Group className="mt-3">
          <Form.Control
            type="file"
            accept="image/*"
            {...register('avatar')}
            onChange={(e) => {
              register('avatar').onChange(e);
              onChangePicture(e);
            }}
          />
        </Form.Group>
      </div>
      <Row className="mt-3">
        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">Họ và tên</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user?.fullname ? user?.fullname : ''}
              {...register('fullname')}
              autoComplete="fullname"
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">Email</Form.Label>
            <Form.Control
              type="email"
              defaultValue={user?.email ? user?.email : ''}
              {...register('email')}
              autoComplete="email"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">Ngày sinh</Form.Label>
            <Form.Control
              type="date"
              defaultValue={user?.birthday ? moment(user?.birthday).format('YYYY-MM-DD') : ''}
              {...register('birthday')}
              autoComplete="birthday"
              required
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">Số điện thoại</Form.Label>
            <Form.Control
              type="text"
              maxLength="10"
              onInput={isNumber}
              defaultValue={user?.phone ? user?.phone : ''}
              {...register('phone')}
              autoComplete="phone"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Form.Group className="mt-3">
          <Form.Label className="form-group required control-label">Đại chỉ</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user?.address ? user?.address : ''}
            {...register('address')}
            autoComplete="address"
            required
          />
        </Form.Group>
      </Row>
    </Form>
  );
}

export default FormEdit;
