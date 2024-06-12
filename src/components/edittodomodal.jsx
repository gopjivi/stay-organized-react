import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { updateTaskbyID } from "../services/taskService";
import { getTaskByUser } from "../services/taskService";

export default function EditTodoModal({
  show,
  todo,
  handleClose,
  setTodos,
  setTodoscopy,
}) {
  const [todoedit, setTodoedit] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedValue, setSelectedValue] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setTodoedit(todo);
    setSelectedValue(todo.completed);
    setErrors({});
  }, [todo]);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setMinDate(formattedDate);
  }, []);

  function validateTask() {
    const validationErrors = {};

    if (!todoedit.description) {
      validationErrors.description = "Description is Required";
    }

    if (!todoedit.deadline) {
      validationErrors.deadline = "Deadline is Required";
    }
    if (!todoedit.priority) {
      validationErrors.priority = "Please Select Priority";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function UpdateTodo() {
    let isvalidated = validateTask();
    console.log(isvalidated);
    if (isvalidated) {
      todoedit.completed = selectedValue;
      let task = updateTaskbyID(todoedit);
      task.then((e) => {
        alert("Task Upadted Successfully");
        handleClose();
        let tasks = getTaskByUser(todoedit.userid);
        tasks.then((e) => {
          console.log(e);
          setTodos(e);
          setTodoscopy(e);
        });
      });
    }
  }
  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      animation={true}
    >
      <Modal.Header className="modal-header divheader" closeButton>
        <Modal.Title> Update User Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Category</div>
            <div className="col-md-8 ms-auto">
              <span id="modalcategory">
                {todoedit.category && todoedit.category}
              </span>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Description</div>
            <div className="col-md-8 ms-auto">
              <textarea
                className={
                  "form-control " +
                  (errors.description ? "borderred" : "borderblack")
                }
                id="description"
                placeholder="Description"
                onChange={(e) =>
                  setTodoedit({ ...todoedit, description: e.target.value })
                }
                value={todoedit.description}
              ></textarea>

              <div>
                {errors.description && (
                  <span className="text-danger">{errors.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Deadline</div>
            <div className="col-md-8 ms-auto">
              <input
                type="date"
                min={minDate}
                className={
                  "form-control " +
                  (errors.deadline ? "borderred" : "borderblack")
                }
                id="deadline"
                onChange={(e) =>
                  setTodoedit({ ...todoedit, deadline: e.target.value })
                }
                value={todoedit.deadline}
              />
              <div>
                {errors.deadline && (
                  <span className="text-danger">{errors.deadline}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Priority</div>
            <div className="col-md-8 ms-auto">
              <select
                className={
                  "form-select " +
                  (errors.priority ? "borderred" : "borderblack")
                }
                id="priority"
                onChange={(e) =>
                  setTodoedit({ ...todoedit, priority: e.target.value })
                }
                value={todoedit.priority}
              >
                <option value="">Select a Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <div>
                {errors.priority && (
                  <span className="text-danger">{errors.priority}</span>
                )}
              </div>
            </div>
          </div>
          <div className="row" style={{ marginBottom: 15 }}>
            <div className="col-md-4">Completed</div>

            <div className="col-md-8 ms-auto">
              <input
                type="radio"
                id="option1"
                value="true"
                checked={selectedValue === true}
                onChange={() => handleRadioChange(true)}
              />
              <label htmlFor="option1">Yes</label>
              <input
                type="radio"
                id="option2"
                value="false"
                checked={selectedValue === false}
                onChange={() => handleRadioChange(false)}
              />
              <label htmlFor="option2">No</label>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="btn btn-blue"
          data-bs-dismiss="modal"
          onClick={() => UpdateTodo()}
        >
          Update
        </button>
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
