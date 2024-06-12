import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { deleteTaskbyID } from "../services/taskService";
import { getTaskByUser } from "../services/taskService";

export default function DeleteTodoModal({
  show,
  todo,
  handleClose,
  setTodos,
  setTodoscopy,
}) {
  function DeleteTodo() {
    let task = deleteTaskbyID(todo.id);
    task.then((e) => {
      alert("Task deleted Successfully");
      handleClose();
      let tasks = getTaskByUser(todo.userid);
      tasks.then((e) => {
        console.log(e);
        setTodos(e);
        setTodoscopy(e);
      });
    });
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={true}
    >
      <Modal.Header className="modal-header divheader" closeButton>
        <Modal.Title>Delete User Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row" style={{ marginBottom: 15 }}>
            <p>
              Are you sure you want to delete this{" "}
              <b className="highlight">{todo.description} </b> task?
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-blue"
          data-bs-dismiss="modal"
          onClick={() => DeleteTodo()}
        >
          Yes
        </button>
        <button
          type="button"
          className="btn btn-blue"
          data-bs-dismiss="modal"
          onClick={() => handleClose()}
        >
          No
        </button>
      </Modal.Footer>
    </Modal>
  );
}
