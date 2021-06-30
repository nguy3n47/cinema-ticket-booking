import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import FormData from './FormData';

function ModalForm(props) {
  const [show, setShow] = useState(props.isShow);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    return () => {};
  }, [dispatch]);

  return (
    <>
      <button type="button" className="btn btn-primary color-primary" onClick={handleShow}>
        <div>
          <span>Thay đổi</span>
        </div>
      </button>
      <Modal size="lg" show={show} backdrop="static" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormData handleClose={handleClose} data={props.data} />
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" form="form-edit" className="btn btn-primary color-primary">
            <div>
              <span>Đồng ý</span>
            </div>
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
