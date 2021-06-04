import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import FormAddEdit from '../Forms/FormAddEdit';

function ModalForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="button-add" onClick={handleShow}>
        <BsFillPlusSquareFill className="button-icon" />
        Add Movie
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddEdit />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button form="form-add-edit" className="button-add" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
