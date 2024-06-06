import { useState } from "react";
import css from "./newuser.module.css";
import { createNewuser } from "../services/userService";
import { checkUserName } from "../services/userService";

export default function Newuser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();
    debugger;
    if (validateUser()) {
      try {
        await createNewuser(user);
        alert("New User Created Successfully");
        setUser({
          name: "",
          username: "",
          password: "",
          confirmpassword: "",
        });
      } catch (e) {
        console.error("Error:", e);
      }
    }
  }

  async function validateUser() {
    const validationErrors = {};

    if (!user.name.trim()) {
      validationErrors.name = " Name is Required";
    }
    if (!user.username.trim()) {
      validationErrors.username = "UserName is Required";
    } else {
      const response = await checkUserName(user.username.trim());
      console.log(response);
      if (!response.available) {
        validationErrors.username = "UserName already exists";
      }
    }

    if (!user.password.trim()) {
      validationErrors.password = "Password is Required";
    } else if (user.password.length < 6) {
      validationErrors.password = "Password should be atleast 6 charactors";
    }

    if (!user.confirmpassword.trim()) {
      validationErrors.confirmpassword = "ConfirmPassword is Required";
    } else if (user.confirmpassword.trim() !== user.password.trim()) {
      validationErrors.confirmpassword = "Confirm Password not matched";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="centerdiv fixmargin">
      <div className="divheader">
        <h4 style={{ paddingTop: 7, paddingLeft: 5 }}>Create New User</h4>
      </div>
      <form className="row g-3 needs-validation tablediv">
        <div className="col-md-8">
          <label className="form-label">Name*:</label>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={
              "form-control " + (errors.name ? css.borderred : css.borderblack)
            }
            value={user.name}
          ></input>
          <div>
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
        </div>
        <div className="col-md-8">
          <label className="form-label">UserName*:</label>
          <input
            type="text"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className={
              "form-control " +
              (errors.username ? css.borderred : css.borderblack)
            }
            value={user.username}
          ></input>
          <div>
            {errors.username && (
              <span className="text-danger">{errors.username}</span>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <label className="form-label">Password*:</label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className={
              "form-control " +
              (errors.password ? css.borderred : css.borderblack)
            }
            value={user.password}
          ></input>
          <div>
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <label className="form-label">confirmpassword*:</label>
          <input
            type="password"
            onChange={(e) =>
              setUser({ ...user, confirmpassword: e.target.value })
            }
            className={
              "form-control " +
              (errors.confirmpassword ? css.borderred : css.borderblack)
            }
            value={user.confirmpassword}
          ></input>
          <div>
            {errors.confirmpassword && (
              <span className="text-danger">{errors.confirmpassword}</span>
            )}
          </div>
        </div>
        <div className="col-md-12" style={{ marginBottom: 20 }}>
          <button className="btn btn-blue" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
