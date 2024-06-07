import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Topheader from "./topheader";
import Navbartoggle from "./navbartoggle";
import Offcanvasheader from "./offcanvasheader";

export default function Header() {
  return (
    <header>
      <Navbartoggle></Navbartoggle>
      <Offcanvasheader></Offcanvasheader>
      <div className="container-fluid">
        <Topheader></Topheader>
      </div>
    </header>
  );
}
