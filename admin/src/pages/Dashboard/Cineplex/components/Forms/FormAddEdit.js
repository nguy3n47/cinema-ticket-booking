import React, { useState } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  createCineplex,
  updateCineplex,
} from '../../../../../redux/actions/cineplexActions';

function FormAddEdit(props) {
  const cineplex = props.data;

  const [picture, setPicture] = useState(cineplex?.image ? cineplex?.image : null);
  const [googleMapUrl, setGoogleMapUrl] = useState(
    cineplex?.googleMapsUrl
      ? cineplex?.googleMapsUrl
      : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15739726.389855992!2d96.86901966300033!3d15.607315091218387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1622966155760!5m2!1svi!2s'
  );

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onAddSubmit = (data) => {
    let bodyFormData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    dispatch(createCineplex(bodyFormData));
  };

  const onUpdateSubmit = (data) => {
    let bodyFormData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    dispatch(updateCineplex(bodyFormData, cineplex.id));
  };

  const onChangePicture = (e) => {
    if (e.target.files.length !== 0) {
      setPicture(URL.createObjectURL(e.target.files[0]));
    } else {
      setPicture(null);
    }
  };

  const onChangeGoogleMapUrl = (e) => {
    let url = e.target.value;
    setGoogleMapUrl(url);
  };

  return (
    <Form
      id="form-add-edit"
      onSubmit={cineplex ? handleSubmit(onUpdateSubmit) : handleSubmit(onAddSubmit)}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              {...register('image')}
              onChange={(e) => {
                register('image').onChange(e);
                onChangePicture(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Image src={picture} fluid />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={cineplex?.name ? cineplex?.name : ''}
              {...register('name')}
              autoComplete="name"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">Address</Form.Label>
            <Form.Control
              type="text"
              defaultValue={cineplex?.address ? cineplex?.address : ''}
              {...register('address')}
              autoComplete="address"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">
              Google Map URL
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={cineplex?.googleMapsUrl ? cineplex?.googleMapsUrl : ''}
              {...register('googleMapsUrl')}
              onChange={(e) => {
                register('googleMapsUrl').onChange(e);
                onChangeGoogleMapUrl(e);
              }}
              autoComplete="googleMapsUrl"
              required
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                title={cineplex?.name}
                width="100%"
                height="185"
                allowFullScreen
                loading="lazy"
                src={googleMapUrl}
              />
            </div>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default FormAddEdit;
