import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import FormData from './FormData';
import { useSelector, useDispatch } from 'react-redux';
import { getMovieShowtimesSelector } from '../../../redux/selectors/movieSelector';
import { getMovieShowtimesAction } from '../../../redux/actions/movieActions';
import moment from 'moment';

function ModalForm(props) {
  const [show, setShow] = useState(props.isShow);
  const { movie } = props;
  const showtimes = useSelector(getMovieShowtimesSelector);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({
      type: 'GET_MOVIE_SHOWTIMES_FAIL',
    });
    setShow(false);
  };

  const handleShow = () => {
    dispatch(
      getMovieShowtimesAction(movie.id, {
        day: moment().format('YYYY-MM-DD'),
      })
    );
    setShow(true);
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: 'REMOVE_MOVIE_SHOWTIMES',
      });
    };
  }, [dispatch]);

  return (
    <>
      <button type="button" className="btn btn-primary color-primary" onClick={handleShow}>
        <div className="d-flex">
          <span className="me-1">Mua vé</span>
          <span>
            <i className="bi bi-wallet2"></i>
          </span>
        </div>
      </button>
      <Modal size="lg" show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormData movieId={movie.id} data={showtimes} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
