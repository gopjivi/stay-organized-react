import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="main-navbar shadow-sm sticky-top topheader">
        <div className="top-navbar">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                <h5 className="brand-name">Stay Organised</h5>
              </div>
              <div className="col-md-5 my-auto"></div>
              <div className="col-md-5 my-auto">
                <ul className="nav justify-content-end">
                  <li className="nav-item">
                    <a className="nav-link" href="login.html">
                      <i className="bi-person"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a
              className="navbar-brand d-block d-sm-block d-md-none d-lg-none"
              href="#"
            >
              Stay Organised
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active text-dark" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active text-dark" to="/newuser">
                    Create New User
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link text-dark dropdown-toggle"
                    href="#"
                    onclick="Viewitem()"
                    id="navbarDarkDropdownMenuLinksidebar"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Tasks &nbsp;<span className="arrow"></span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-light"
                    id="menuitemid"
                    aria-labelledby="navbarDarkDropdownMenuLinksidebar"
                    style={{ border: 0 }}
                  >
                    <li>
                      <Link className="dropdown-item" to="/newtask">
                        Create New Task
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/viewtask">
                        View by User
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
