import { useContext } from "react";

export default function Topheader() {
  const userName = JSON.parse(localStorage.getItem("username"));
  return (
    <div className="row topheader">
      <div className="col-md-2 my-auto">
        <h5 className="brand-name">Stay-Organised</h5>
      </div>
      <div className="col-md-4 my-auto d-none d-sm-none d-md-block d-lg-block"></div>
      <div className="col-md-3 my-auto"></div>
      <div className="col-md-3 my-auto">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link text-dark" href="/">
              <span id="headername">Welcome {userName}</span>{" "}
              <i className="bi-person-fill"></i>{" "}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
