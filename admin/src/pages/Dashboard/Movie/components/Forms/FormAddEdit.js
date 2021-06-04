import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createMovie } from '../../../../../redux/actions/movieActions';

function FormAddEdit() {
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    data.release_date = moment(startDate).format('MM-DD-YYYY');

    let bodyFormData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'poster') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    dispatch(createMovie(bodyFormData));
  };

  return (
    <Form id="form-add-edit" onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col>
          <Form.Group className="h-50">
            <Form.Label>Poster</Form.Label>
            <Form.Control
              type="file"
              {...register('poster')}
              autoComplete="poster"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Trailer</Form.Label>
            <Form.Control
              type="text"
              {...register('trailer')}
              autoComplete="trailer"
              required
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              {...register('title')}
              autoComplete="title"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              {...register('description')}
              autoComplete="description"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              {...register('director')}
              autoComplete="director"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Actor</Form.Label>
            <Form.Control
              type="text"
              {...register('actor')}
              autoComplete="actor"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              {...register('genre')}
              autoComplete="genre"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Release Date</Form.Label>
            <DatePicker
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartDate(date)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Running Time</Form.Label>
            <Form.Control
              type="number"
              {...register('running_time')}
              autoComplete="running_time"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>State</Form.Label>
            <Form.Select aria-label="Select state" {...register('state')} required>
              <option value="coming-soon">Coming Soon</option>
              <option value="now-showing">Now Showing</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default FormAddEdit;
