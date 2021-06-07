import React, { useEffect } from 'react';
import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import './styles.scss';

function FormAddEdit(props) {
  const cinema = props.data;
  const { cineplexs } = props;

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onAddSubmit = (data) => {
    console.log(data);
  };

  const onUpdateSubmit = (data) => {
    console.log(data);
  };

  const renderSeats = (vertical_size, horizontal_size) => {
    let chr;
    let seat_code;
    let cols = [];
    let rows = [];

    for (let i = 0; i < vertical_size; i++) {
      for (let j = 1; j <= horizontal_size; j++) {
        chr = String.fromCharCode(65 + i);
        seat_code = chr + j.toString();
        cols.push(
          <div key={seat_code} className="seat">
            {seat_code}
          </div>
        );
      }

      rows.push(
        <div key={chr} className="row-clone justify-content-center">
          {cols.map((col, i) => {
            return col;
          })}
        </div>
      );

      cols = [];
    }
    return rows;
  };

  return (
    <Form
      id="form-add-edit"
      onSubmit={cinema ? handleSubmit(onUpdateSubmit) : handleSubmit(onAddSubmit)}>
      <Row>
        <Form.Group className="mt-3">
          <Form.Label className="form-group required control-label">Cineplex</Form.Label>
          <Form.Select
            defaultValue={cinema?.cineplex_id ? cinema?.cineplex_id : ''}
            aria-label="Select Cineplex"
            {...register('cineplex')}
            required>
            {cineplexs.map((cineplex, i) => {
              return (
                <option key={i} value={cineplex.id}>
                  {cineplex.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group className="mt-3">
          <Form.Label className="form-group required control-label">Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={cinema?.name ? cinema?.name : ''}
            {...register('name')}
            autoComplete="name"
            required
          />
        </Form.Group>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">
              Vertical Size
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={cinema?.vertical_size ? cinema?.vertical_size : ''}
              {...register('vertical_size')}
              autoComplete="vertical_size"
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">
              Horizontal Size
            </Form.Label>
            <Form.Control
              type="number"
              defaultValue={cinema?.horizontal_size ? cinema?.horizontal_size : ''}
              {...register('horizontal_size')}
              autoComplete="horizontal_size"
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <div className="mt-4">
        <img className="screen mb-4" alt="screen" src="https://i.imgur.com/uPARdNz.png" />
        {cinema ? renderSeats(cinema?.vertical_size, cinema?.horizontal_size) : ''}
      </div>
    </Form>
  );
}

export default FormAddEdit;
