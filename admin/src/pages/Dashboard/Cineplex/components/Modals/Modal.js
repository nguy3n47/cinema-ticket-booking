import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import FormAddEdit from '../Forms/FormAddEdit';

function ModalForm(props) {
  const [show, setShow] = useState(props.isShow);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buutonAdd = (
    <Button className="button-add" onClick={handleShow}>
      <BsFillPlusSquareFill className="button-icon" />
      Add Cineplex
    </Button>
  );

  return (
    <>
      {props.method === 'add' ? buutonAdd : ''}

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddEdit data={props.data} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={handleClose}
            form="form-add-edit"
            className="button-add"
            type="submit">
            {props.method === 'add' ? 'Submit' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
