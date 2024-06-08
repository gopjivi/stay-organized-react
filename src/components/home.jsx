import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Cards from "./cards";

export default function home() {
  return (
    <div className="bgcolor">
      <Header></Header>
      <div className="container-fluid navbarheight">
        <div className="row">
          <Sidebar></Sidebar>
          <div className="col-md-9">
            <Cards></Cards>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
