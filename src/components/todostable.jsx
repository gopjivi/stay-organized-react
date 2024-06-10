import { useEffect, useState } from "react";
import { Gettaskbyid, getTaskByUser } from "../services/taskService";
import Modal from "react-bootstrap/Modal";
import ViewTodoModal from "./viewtodomodal";
import EditTodoModal from "./edittodomodal";
import { deleteTaskbyID } from "../services/taskService";

export default function Todostable({ userID }) {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [show, setShow] = useState(false);
  const [showforedit, setShowForEdit] = useState(false);

  console.log(userID);
  useEffect(() => {
    if (userID) {
      let tasks = getTaskByUser(userID);
      tasks.then((e) => {
        console.log(e);
        setTodos(e);
      });
    }
  }, [userID]);

  function renderIcon(priority) {
    if (priority == "Low") {
      return <span className="badge bg-success">{priority}</span>;
    } else if (priority == "Medium") {
      return <span className="badge bg-warning">{priority}</span>;
    } else if (priority == "High") {
      return <span className="badge bg-danger">{priority}</span>;
    }
  }
  function renderIconForStatus(status) {
    if (status) {
      return <i className="bi bi-check-lg bi-green"></i>;
    } else {
      return <i className="bi bi-x-lg bi-red"></i>;
    }
  }
  // Function Called on click of the Button for open model
  function viewTODODetails(id) {
    let task = Gettaskbyid(id);
    task.then((e) => {
      console.log(e);
      setTodo(e);
    });
    setShow(true);
  }
  function editTODODetails(id) {
    let task = Gettaskbyid(id);
    task.then((e) => {
      console.log(e);
      setTodo(e);
    });
    setShowForEdit(true);
  }
  function deleteTODODetails(id, userid) {
    var result = window.confirm("Are you sure you want to delete Todo?");
    if (result) {
      let task = deleteTaskbyID(id);
      task.then((e) => {
        alert("Task deleted Successfully");
        handleClose();
        let tasks = getTaskByUser(userid);
        tasks.then((e) => {
          console.log(e);
          setTodos(e);
        });
      });
    }
  }
  function handleClose() {
    setShow(false);
    setShowForEdit(false);
  }

  return (
    <div>
      <div className="table-responsive">
        {/* className={`table-responsive ${show ? "blur" : ""}`} */}

        <table
          id="tasktable"
          className="table table-striped align-middle bg-white text-center"
        >
          {todos.length > 0 && (
            <thead className="bg-light">
              <tr>
                <td>
                  {" "}
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="search by description"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td colspan="4" style={{ textAlign: "right" }}>
                  Filter By :
                  <select
                    id="category"
                    className="dropdown"
                    style={{ marginRight: 10, marginLeft: 10 }}
                  >
                    <option value="">Category</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-blue"
                    style={{ marginRight: 10 }}
                  >
                    <i className="bi bi-check-lg bi-green"></i>
                  </button>
                  <button type="button" className="btn btn-blue">
                    <i className="bi bi-x-lg bi-red"></i>
                  </button>
                </td>
              </tr>
              <tr>
                <th>Description</th>
                <th>
                  Deadline<i class="bi bi-funnel-fill"></i>
                </th>
                <th>
                  Priority<i class="bi bi-funnel-fill"></i>
                </th>
                <th>Completed</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
          )}
          <tbody>
            {todos.length > 0 && userID !== "" ? (
              todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.deadline}</td>
                  <td>{renderIcon(todo.priority)}</td>
                  <td>
                    {todo.completed ? (
                      <i className="bi bi-check-lg bi-green"></i>
                    ) : (
                      <i className="bi bi-x-lg bi-red"></i>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-blue"
                      onClick={() => viewTODODetails(todo.id)}
                    >
                      <i className="bi bi-binoculars-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-blue"
                      onClick={() => editTODODetails(todo.id)}
                    >
                      <i className="bi bi-pen-fill"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-blue"
                      onClick={() => deleteTODODetails(todo.id, todo.userid)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div id="noresult" className="text-center bg-light text-danger">
                No Results Found !!!
              </div>
            )}
          </tbody>
        </table>
      </div>

      <ViewTodoModal
        show={show}
        todo={todo}
        handleClose={handleClose}
        renderIcon={renderIcon}
        renderIconForStatus={renderIconForStatus}
      ></ViewTodoModal>
      <EditTodoModal
        show={showforedit}
        todo={todo}
        handleClose={handleClose}
        setTodos={setTodos}
      ></EditTodoModal>
    </div>
  );
}
