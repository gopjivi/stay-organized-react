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

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newuser" element={<Newuser />} />
        <Route path="/newtask" element={<Newtask />} />
        <Route path="/viewtask" element={<Viewtask />} />
      </Routes>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
