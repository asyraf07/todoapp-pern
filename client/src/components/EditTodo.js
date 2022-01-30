import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const EditTodo = ({ todo }) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const handleClose = () => {
    setShow(false);
    setDescription(todo.description);
  };
  const handleShow = () => setShow(true);
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Redirect to the same page (refresh)
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={updateDescription}>
            Edit
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTodo;
