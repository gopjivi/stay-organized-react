import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Cards from "./cards";
import Todostable from "./todostable";
import LoginUserToDo from "./loginusertodo";

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
            <div className="row tablediv topmargin">
              <div className="col-md-12 divmarginbottom borderstyle">
                <h5>My Tasks</h5>
              </div>
            </div>
            <LoginUserToDo userID={userID}></LoginUserToDo>
            {/* <Todostable userID={userID}></Todostable> */}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
