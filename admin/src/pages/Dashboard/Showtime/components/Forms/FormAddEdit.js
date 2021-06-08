import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

function FormAddEdit(props) {
  const showtime = props.data;
  const { cineplexs } = props;

  const { register, handleSubmit } = useForm();
  const [currentCineplexId, setCurrentCineplexId] = useState(
    showtime ? showtime?.Cinema?.cineplex_id : 1
  );
  const dispatch = useDispatch();

  const onAddSubmit = (data) => {
    console.log(data);
  };

  const onUpdateSubmit = (data) => {
    console.log(data);
  };

  const onChangeCineplexId = (e) => {
    setCurrentCineplexId(parseInt(e.target.value));
  };

  return (
    <Form
      id="form-add-edit"
      onSubmit={showtime ? handleSubmit(onUpdateSubmit) : handleSubmit(onAddSubmit)}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">
              Cineplex
            </Form.Label>
            <Form.Select
              defaultValue={
                showtime?.Cinema.cineplex_id
                  ? showtime?.Cinema?.cineplex_id
                  : currentCineplexId
              }
              aria-label="Select Cineplex"
              {...register('cineplex_id')}
              onChange={(e) => {
                register('cineplex_id').onChange(e);
                onChangeCineplexId(e);
              }}
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

          <Form.Group>
            <Form.Label className="form-group required control-label">Cinema</Form.Label>
            <Form.Select
              defaultValue={showtime?.Cinema?.id ? showtime?.Cinema?.id : 1}
              aria-label="Select Cinema"
              {...register('cinema_id')}
              required>
              {cineplexs
                .filter((cineplex) => cineplex.id === currentCineplexId)[0]
                .Cinemas.map((cinema, i) => {
                  return (
                    <option key={i} value={cinema.id}>
                      {cinema.name}
                    </option>
                  );
                })}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">
              Start Time
            </Form.Label>
            <Form.Control type="datetime-local" />
          </Form.Group>

          <Form.Group>
            <Form.Label className="form-group required control-label">Price</Form.Label>
            <Form.Control
              type="number"
              defaultValue={showtime?.price ? showtime?.price : ''}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default FormAddEdit;
