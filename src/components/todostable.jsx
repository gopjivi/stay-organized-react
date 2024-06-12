import { useEffect, useState } from "react";
import { Gettaskbyid, getTaskByUser } from "../services/taskService";
import Modal from "react-bootstrap/Modal";
import ViewTodoModal from "./viewtodomodal";
import EditTodoModal from "./edittodomodal";

import { useFetch } from "../services/useFetch";
import DeleteTodoModal from "./deletetodomodal";

export default function Todostable({ userID }) {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({});
  const [show, setShow] = useState(false);
  const [showforedit, setShowForEdit] = useState(false);
  const [showfordelete, setShowForDelete] = useState(false);
  const [filterforcategory, setFilterforcategory] = useState("");
  const [filterfordescription, setFilterfordescription] = useState("");
  const [todosforcategory, setTodosforcategory] = useState([]);
  const [todosfordescription, setTodosfordescription] = useState([]);
  const [priority, setPriority] = useState("ASC");

  const [todoscopy, setTodoscopy] = useState([]);
  const [categories, setCategories] = useState({});

  const categoriesApiUrl = "http://localhost:8083/api/categories";
  const [categoriesData] = useFetch(categoriesApiUrl);

  const priorityOrder = ["Low", "Medium", "High"];
  const priorityOrderDesc = ["High", "Medium", "Low"];

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (userID) {
      let tasks = getTaskByUser(userID);
      tasks.then((e) => {
        setTodos(e);
        setTodoscopy(e);
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
    let task = Gettaskbyid(id);
    task.then((e) => {
      console.log(e);
      setTodo(e);
    });

    setShowForDelete(true);
  }

  function handleClose() {
    setShow(false);
    setShowForEdit(false);
    setShowForDelete(false);
  }
  function searchByDescription(e) {
    setFilterfordescription(e.target.value);
    let [filteredTodos] = [todos];
    let input = e.target.value;
    console.log(filteredTodos);
    if (input.length > 0) {
      filteredTodos = filteredTodos.filter((todo) =>
        todo.description.toLowerCase().includes(input.toLowerCase())
      );
      setTodos(filteredTodos);
      console.log("filterby desc", filteredTodos);
    } else {
      setTodos(todoscopy);
    }
    setTodosfordescription(filteredTodos);
  }
  function getTaskByCategory(e) {
    let category = e.target.value;
    setFilterforcategory(category);
    let [filteredTodos] = [todos];
    console.log(category);
    if (category != "") {
      filteredTodos = todoscopy.filter(
        (todo) => todo.category.toLowerCase() === category.toLowerCase()
      );
      setTodos(filteredTodos);
    } else {
      setTodos(todoscopy);
    }

    setTodosforcategory(filteredTodos);
  }
  function getCompletedTask() {
    let [filteredTodos] = [todos];

    filteredTodos = todoscopy.filter((todo) => todo.completed === true);
    setTodos(filteredTodos);
  }
  function getInCompletedTask() {
    let [filteredTodos] = [todos];

    filteredTodos = todoscopy.filter((todo) => todo.completed === false);
    setTodos(filteredTodos);
  }
  function getAllTask() {
    setTodos(todoscopy);
    setFilterforcategory("");
  }

  function sortByPriority() {
    if (priority == "ASC") {
      const sorted = [...todos].sort((a, b) => {
        return (
          priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
        );
      });
      console.log(sorted);
      setTodos(sorted);
      setPriority("DESC");
    } else {
      const sorted = [...todos].sort((a, b) => {
        return (
          priorityOrderDesc.indexOf(a.priority) -
          priorityOrderDesc.indexOf(b.priority)
        );
      });
      console.log(sorted);
      setTodos(sorted);
      setPriority("ASC");
    }
  }

  return (
    <div>
      <div className="table-responsive-md">
        {/* className={`table-responsive ${show ? "blur" : ""}`} */}

        <table
          id="tasktable"
          className="table table-striped align-middle bg-white text-center"
        >
          <thead className="bg-light">
            <tr>
              <td colspan="2">
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
                    value={filterfordescription}
                    onChange={(e) => searchByDescription(e)}
                  />
                </div>
              </td>
              <td></td>
              <td colspan="4" style={{ textAlign: "right" }}>
                Filter By :
                <select
                  id="category"
                  className="dropdown"
                  style={{ marginRight: 10, marginLeft: 10 }}
                  onChange={getTaskByCategory}
                  value={filterforcategory}
                >
                  <option value="">Category</option>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </select>
                <button
                  type="button"
                  className="btn btn-blue"
                  style={{ marginRight: 10 }}
                  onClick={getCompletedTask}
                >
                  <i className="bi bi-check-lg bi-green"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-blue"
                  style={{ marginRight: 10 }}
                  onClick={getInCompletedTask}
                >
                  <i className="bi bi-x-lg bi-red"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-blue"
                  onClick={getAllTask}
                >
                  All
                </button>
              </td>
            </tr>
            <tr>
              <th>Description</th>
              <th>Deadline</th>
              <th>
                Priority{" "}
                <img
                  src="/sorticon.png"
                  className="img-fluid"
                  alt="filter"
                  onClick={sortByPriority}
                ></img>{" "}
              </th>
              <th>Completed</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

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
              <tr>
                <td colspan="7">
                  <div
                    id="noresult"
                    className="text-center bg-light text-danger"
                  >
                    No Results Found !!!
                  </div>
                </td>
              </tr>
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
        setTodoscopy={setTodoscopy}
      ></EditTodoModal>
      <DeleteTodoModal
        show={showfordelete}
        todo={todo}
        handleClose={handleClose}
        setTodos={setTodos}
        setTodoscopy={setTodoscopy}
      ></DeleteTodoModal>
    </div>
  );
}
