import { useEffect, useState } from "react";
import { getAllCategories } from "../services/taskService";
import { getAllUsers } from "../services/taskService";
import { addNewTask } from "../services/taskService";
import { useFetch } from "../services/useFetch";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";

export default function Newtask() {
  const [todo, setTodo] = useState({
    userid: "",
    category: "",
    description: "",
    deadline: "",
    priority: "",
  });
  const [categories, setCategories] = useState({});
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");
  const navigate = useNavigate();

  const categoriesApiUrl = "http://localhost:8083/api/categories";
  const usersApiUrl = "http://localhost:8083/api/users";

  const [categoriesData] = useFetch(categoriesApiUrl);
  const [usersData] = useFetch(usersApiUrl);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setMinDate(formattedDate);
  }, []);

  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  function validateTask() {
    const validationErrors = {};

    if (!todo.userid) {
      validationErrors.userid = "Please Select User";
    }
    if (!todo.category) {
      validationErrors.category = "Please Select Category";
    }

    if (!todo.description) {
      validationErrors.description = "Description is Required";
    }

    if (!todo.deadline) {
      validationErrors.deadline = "Deadline is Required";
    }
    if (!todo.priority) {
      validationErrors.priority = "Please Select Priority";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const isvalidated = validateTask();
    console.log(isvalidated);
    if (isvalidated) {
      let task = addNewTask(todo);
      task.then((e) => {
        alert("New Task Created Successfully");
        setTodo({
          userid: "",
          category: "",
          description: "",
          deadline: "",
          priority: "",
        });
        navigate("/home");
      });
    }
  }

  return (
    <div className="bgcolor">
      <Header></Header>
      <div className="container-fluid navbarheight">
        <div className="row">
          <Sidebar></Sidebar>
          <div className="col-md-9">
            <div className="bg-light centerdiv fixmargin">
              <div className="divheader">
                <h4 style={{ paddingTop: 7, paddingLeft: 5 }}>
                  Create New Task
                </h4>
              </div>
              <form className="row g-3 needs-validation tablediv">
                <div className="col-md-8">
                  <label className="form-label">User*</label>
                  <select
                    id="userid"
                    className={
                      "form-select " +
                      (errors.userid ? "borderred" : "borderblack")
                    }
                    onChange={(e) =>
                      setTodo({ ...todo, userid: e.target.value })
                    }
                    value={todo.userid}
                  >
                    <option value="">Select a User</option>
                    {users.length > 0 &&
                      users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                  <div>
                    {errors.userid && (
                      <span className="text-danger">{errors.userid}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <label className="form-label">Category*</label>
                  <select
                    id="category"
                    className={
                      "form-select " +
                      (errors.category ? "borderred" : "borderblack")
                    }
                    onChange={(e) =>
                      setTodo({ ...todo, category: e.target.value })
                    }
                    value={todo.category}
                  >
                    <option value="">Select a category</option>
                    {categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                  <div>
                    {errors.category && (
                      <span className="text-danger">{errors.category}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <label className="form-label">Description*</label>
                  <textarea
                    className={
                      "form-control " +
                      (errors.description ? "borderred" : "borderblack")
                    }
                    id="description"
                    placeholder="Description"
                    onChange={(e) =>
                      setTodo({ ...todo, description: e.target.value })
                    }
                    value={todo.description}
                  ></textarea>
                  <div>
                    {errors.description && (
                      <span className="text-danger">{errors.description}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <label className="form-label">DeadLine*</label>
                  <input
                    type="date"
                    min={minDate}
                    className={
                      "form-control " +
                      (errors.deadline ? "borderred" : "borderblack")
                    }
                    id="deadline"
                    onChange={(e) =>
                      setTodo({ ...todo, deadline: e.target.value })
                    }
                    value={todo.deadline}
                  />
                  <div>
                    {errors.deadline && (
                      <span className="text-danger">{errors.deadline}</span>
                    )}
                  </div>
                </div>
                <div className="col-md-8">
                  <label className="form-label">Priority*</label>
                  <select
                    className={
                      "form-select " +
                      (errors.priority ? "borderred" : "borderblack")
                    }
                    id="priority"
                    onChange={(e) =>
                      setTodo({ ...todo, priority: e.target.value })
                    }
                    value={todo.priority}
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

                <div className="col-12" style={{ marginBottom: 20 }}>
                  <button
                    className="btn btn-blue"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
