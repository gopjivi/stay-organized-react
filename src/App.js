import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import Home from "./components/home";
import Login from "./components/login";
import Newuser from "./components/newuser";
import Newtask from "./components/newtask";
import Viewtask from "./components/viewtask";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/newuser" element={<Newuser />} />
      <Route path="/newtask" element={<Newtask />} />
      <Route path="/viewtask" element={<Viewtask />} />
    </Routes>
  );
}

export default App;
