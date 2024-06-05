import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Newuser from "./components/newuser";
import Home from "./components/home";
import Newtask from "./components/newtask";
import Viewtask from "./components/viewtask";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";

function App() {
  return (
    <div className="bgcolor">
      <Header></Header>
      <div className="container-fluid navbarheight">
        <div class="row">
          <Sidebar></Sidebar>
          <div class="col-md-9">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/newuser" element={<Newuser />} />
              <Route path="/newtask" element={<Newtask />} />
              <Route path="/viewtask" element={<Viewtask />} />
            </Routes>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
