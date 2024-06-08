import { useEffect, useState } from "react";
import { getTaskByUser } from "../services/taskService";
import { useFetch } from "../services/useFetch";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";

export default function Viewtask() {
  const [users, setUsers] = useState([]);
  const [userid, setuserID] = useState("");
  const [todos, setTodos] = useState([]);

  const usersApiUrl = "http://localhost:8083/api/users";

  const [usersData] = useFetch(usersApiUrl);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  function getSelecteduserID(e) {
    let user = e.target.value;
    console.log(user);
    setuserID(user);
    if (user !== "") {
      let tasks = getTaskByUser(user);
      tasks.then((e) => {
        console.log(e);
        setTodos(e);
      });
    }
  }

  function renderIcon(priority) {
    console.log("rendering");
    if (priority == "Low") {
      return <span className="badge bg-success">{priority}</span>;
    } else if (priority == "Medium") {
      return <span className="badge bg-warning">{priority}</span>;
    } else if (priority == "High") {
      return <span className="badge bg-danger">{priority}</span>;
    }
  }

  return (
    <div className="bgcolor">
      <Header></Header>
      <div className="container-fluid navbarheight">
        <div className="row">
          <Sidebar></Sidebar>
          <div className="col-md-9">
            <div className="row margintop text-center">
              <div className="text-center">
                Please Select User Here :
                <select
                  id="userlList"
                  className="dropdown-toggle"
                  onChange={getSelecteduserID}
                >
                  <option value="">Select a User</option>
                  {users.length > 0 &&
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="table-responsive" style={{ marginTop: 20 }}>
                <table
                  id="tasktable"
                  className="table table-striped align-middle mt-20 bg-white text-center"
                >
                  {todos.length > 0 && (
                    <thead className="bg-light">
                      <tr>
                        <th>Description</th>
                        <th>Deadline</th>
                        <th>Priority</th>
                        <th>Completed</th>
                        <th>View</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {todos.length > 0 && userid !== "" ? (
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
                              //onclick={getInstanceAndShow(todo.id)}
                            >
                              <i className="bi bi-binoculars-fill"></i>
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-blue"
                              // onclick={getInstanceAndEdit(todo.id)}
                            >
                              <i className="bi bi-pen-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <div
                        id="noresult"
                        className="text-center bg-light text-danger"
                      >
                        No Results Found !!!
                      </div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
