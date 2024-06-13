import React, { useState, useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import { validateUserByName } from "../services/userService";
import { createContext } from "react";

export const Context = createContext();

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [userid, setUserID] = useState("");

  const navigate = useNavigate();

  async function validateUser() {
    const validationErrors = {};

    if (!username.trim()) {
      validationErrors.username = "User Name is Required";
    } else {
      const response = await validateUserByName(username);
      let status = response.status;
      console.log(status);
      if (status == 200) {
        const myPromise = await response.json().then((data) => {
          console.log(data.id);
          setUserID(data.id);
          localStorage.setItem("userid", JSON.stringify(data.id));
          localStorage.setItem("username", JSON.stringify(username));
        });
      } else {
        // validationErrors.username = "Invalid credentials";
        //validationErrors.password = "Invalid credentials";
        alert("Invalid credentials");
        return false;
      }
    }

    if (!password.trim()) {
      validationErrors.password = "Password is Required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let isvalidated = await validateUser();
    console.log(isvalidated);
    if (isvalidated) {
      alert("User login successfully done");

      navigate("/home");
    }
  }
  return (
    <div className="vh-100 bgcolor">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="/taskimage.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-floating mx-1"
              >
                <i className="bi bi-facebook"></i>
              </button>

              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-floating mx-1"
              >
                <i className="bi bi-twitter"></i>
              </button>

              <button
                type="button"
                data-mdb-button-init
                data-mdb-ripple-init
                className="btn btn-primary btn-floating mx-1"
              >
                <i className="bi bi-linkedin"></i>
              </button>
            </div>

            <div className="divider d-flex align-items-center my-2"></div>

            <form className="row g-3">
              <div className="col-md-10">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className={
                    "form-control " +
                    (errors.username ? "borderred" : "borderblack")
                  }
                  id="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  onBlur={(e) => SetPassword(e.target.value)}
                />
                <div>
                  {errors.username && (
                    <span className="text-danger">{errors.username}</span>
                  )}
                </div>
              </div>
              <div className="col-md-10">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={
                    "form-control " +
                    (errors.password ? "borderred" : "borderblack")
                  }
                  id="password"
                  value={password}
                  onChange={(e) => SetPassword(e.target.value)}
                />
                <div>
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
              </div>

              <div className="col-md-10 justify-content-between align-items-center">
                <div className="row">
                  <div className="col-md-6">
                    <input className="me-2" type="checkbox" />
                    <label className="check-label"> Remember me </label>
                  </div>
                  <div className="col-md-6 textright">
                    <a href="#!" className="text-body">
                      Forgot password?
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <button
                  className="btn btn-blue"
                  type="submit"
                  onClick={handleSubmit}
                  id="adduserbutton"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
