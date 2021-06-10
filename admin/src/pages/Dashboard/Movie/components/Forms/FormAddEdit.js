import moment from 'moment';
import React, { useState } from 'react';
import { Col, Form, Image, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createMovie, updateMovie } from '../../../../../redux/actions/movieActions';

function FormAddEdit(props) {
  const movie = props.data;

  const getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const [startDate, setStartDate] = useState(
    movie?.release_date ? new Date(moment(movie?.release_date)) : new Date()
  );
  const [picture, setPicture] = useState(movie?.poster ? movie?.poster : null);
  const [videoId, setVideoId] = useState(movie?.trailer ? getId(movie?.trailer) : null);

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onAddSubmit = (data) => {
    data.release_date = moment(startDate).format('YYYY-MM-DD');

    let bodyFormData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'poster') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });
    dispatch(createMovie(bodyFormData));
    props.handleClose();
  };

  const onUpdateSubmit = (data) => {
    data.release_date = moment(startDate).format('YYYY-MM-DD');

    let bodyFormData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === 'poster') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    dispatch(updateMovie(bodyFormData, movie.id));
    props.handleClose();
  };

  const onChangePicture = (e) => {
    if (e.target.files.length !== 0) {
      setPicture(URL.createObjectURL(e.target.files[0]));
    } else {
      setPicture(null);
    }
  };

  const onChangeVideoId = (e) => {
    let id = getId(e.target.value);
    setVideoId(id);
  };

  return (
    <Form
      id="form-add-edit"
      onSubmit={movie ? handleSubmit(onUpdateSubmit) : handleSubmit(onAddSubmit)}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">Poster</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              {...register('poster')}
              onChange={(e) => {
                register('poster').onChange(e);
                onChangePicture(e);
              }}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Image src={picture} fluid />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">Trailer</Form.Label>
            <Form.Control
              type="text"
              defaultValue={movie?.trailer ? movie?.trailer : ''}
              {...register('trailer')}
              onChange={(e) => {
                register('trailer').onChange(e);
                onChangeVideoId(e);
              }}
              autoComplete="trailer"
              required
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="embed-responsive-item"
                title="sdsds"
                width="100%"
                height="185"
                controls
                allowFullScreen
                src={`https://www.youtube.com/embed/${videoId}`}
              />
            </div>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label className="form-group required control-label">Title</Form.Label>
            <Form.Control
              type="text"
              defaultValue={movie?.title ? movie?.title : ''}
              {...register('title')}
              autoComplete="title"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              className="text-break"
              defaultValue={movie?.description ? movie?.description : ''}
              rows={10}
              {...register('description')}
              autoComplete="description"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">
              Director
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={movie?.director ? movie?.director : ''}
              {...register('director')}
              autoComplete="director"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">Actor</Form.Label>
            <Form.Control
              type="text"
              defaultValue={movie?.actor ? movie?.actor : ''}
              {...register('actor')}
              autoComplete="actor"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">Genre</Form.Label>
            <Form.Control
              type="text"
              defaultValue={movie?.genre ? movie?.genre : ''}
              {...register('genre')}
              autoComplete="genre"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">
              Release Date
            </Form.Label>

            <DatePicker
              className="form-control"
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartDate(date)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">
              Running Time
            </Form.Label>
            <Form.Control
              type="number"
              min="0"
              defaultValue={movie?.running_time ? movie?.running_time : ''}
              {...register('running_time')}
              autoComplete="running_time"
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label className="form-group required control-label">State</Form.Label>
            <Form.Select
              defaultValue={movie?.state ? movie?.state : ''}
              aria-label="Select state"
              {...register('state')}
              required>
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
