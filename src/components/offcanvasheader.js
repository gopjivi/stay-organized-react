import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default function offcanvasheader() {
  function ViewitemCanvas() {
    var arrow = document.querySelector(".arrowforcanvas");
    arrow.classList.toggle("rotate-down");
  }
  return (
    <div
      className="offcanvas offcanvas-start d-md-block bg-light"
      tabindex="-1"
      id="sidebar"
      aria-labelledby="sidebarLabel"
      style={{ width: 250 }}
    >
      <div className="offcanvas-header topheader">
        <h5 className="offcanvas-title text-dark" id="sidebarLabel">
          Stay-Organised
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a
              className="nav-link active text-dark"
              id="canvashomelinkid"
              href="/"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link text-dark"
              id="canvasnewuserid"
              href="/newuser"
            >
              Create New User
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link text-dark dropdown-toggle"
              href="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              onclick="ViewitemCanvas()"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Tasks &nbsp;<span className="arrowforcanvas"></span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-light"
              aria-labelledby="navbarDarkDropdownMenuLink"
              style={{ border: 0 }}
            >
              <li>
                <a
                  className="dropdown-item"
                  id="canvasnewtaskid"
                  href="/newtask"
                >
                  Create New Task
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  id="canvasviewtaskid"
                  href="/viewtask"
                >
                  View by User
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
