import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Cards from "./cards";
import Todostable from "./todostable";

export default function home() {
  const userID = JSON.parse(localStorage.getItem("userid"));

  return (
    <div className="bgcolor">
      <Header></Header>
      <div className="container-fluid navbarheight">
        <div className="row">
          <Sidebar></Sidebar>
          <div className="col-md-9">
            <Cards></Cards>
            <div className="row">
              <div className="col-md-12 divmarginbottom">
                <h5>My Tasks</h5>
              </div>
              <Todostable userID={userID}></Todostable>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
