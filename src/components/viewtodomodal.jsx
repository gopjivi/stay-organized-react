import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function ViewTodoModal({
  show,
  todo,
  handleClose,
  renderIcon,
  renderIconForStatus,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={true}
    >
      <Modal.Header className="modal-header divheader" closeButton>
        <Modal.Title> User Task Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Category</div>
            <div className="col-md-4 ms-auto">
              <span id="modalcategory">{todo.category && todo.category}</span>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Description</div>
            <div className="col-md-4 ms-auto">
              <span id="modaldescription">
                {" "}
                {todo.description && todo.description}
              </span>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Deadline</div>
            <div className="col-md-4 ms-auto">
              <span id="modaldeadline"> {todo.deadline && todo.deadline}</span>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Priority</div>
            <div className="col-md-4 ms-auto">{renderIcon(todo.priority)}</div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Completed</div>
            <div className="col-md-4 ms-auto">
              {renderIconForStatus(todo.completed)}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-blue"
          data-bs-dismiss="modal"
          onClick={() => handleClose()}
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
