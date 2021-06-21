import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import FormData from './FormData';

function ModalForm(props) {
  const [show, setShow] = useState(props.isShow);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Modal size="lg" show={show} backdrop="static" onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormData />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
