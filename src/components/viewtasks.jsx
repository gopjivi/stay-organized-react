import { useEffect, useState } from "react";
import { getTaskByUser } from "../services/taskService";
import { useFetch } from "../services/useFetch";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Todostable from "./todostable";

export default function Viewtasks() {
  const [users, setUsers] = useState([]);
  const [userid, setuserID] = useState("");
  const [allbutton, setAllButton] = useState(false);
  const [completedbutton, setCompletedButton] = useState(false);
  const [pendingbutton, setPendingButton] = useState(false);

  const usersApiUrl = "http://localhost:8083/api/users";

  const [usersData] = useFetch(usersApiUrl);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData);
    }
  }, [usersData]);

  function getSelecteduserID(e) {
    let user = e.target.value;
    console.log(user);
    setuserID(user);
  }
  useEffect(() => {
    if (userid) {
      setuserID(userid);
      console.log("userid from state", userid);
      setAllButton(false);
      setCompletedButton(false);
      setPendingButton(false);
    }
  }, [userid]);

  return (
    <div className="bgcolor">
      <Header></Header>
      <div className="container-fluid navbarheight">
        <div className="row">
          <Sidebar></Sidebar>
          <div className="col-md-9">
            <div className="row margintop text-center">
              <div className="text-center" style={{ marginBottom: 30 }}>
                Please Select User Here{" "}
                <select
                  id="userlList"
                  className="dropdown-toggle"
                  onChange={getSelecteduserID}
                >
                  <option value="">Select a User</option>
                  {users.length > 0 &&
                    users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
              </div>
              {/* <div className="rightalign">
                <button
                  type="button"
                  className="btn btn-blue"
                  onClick={AddTaskForUser}
                >
                  <i class="bi bi-plus-lg"></i> Add New Task
                </button>
              </div> */}
              <Todostable
                userID={userid}
                setAllButton={setAllButton}
                setCompletedButton={setCompletedButton}
                setPendingButton={setPendingButton}
                allbutton={allbutton}
                completedbutton={completedbutton}
                pendingbutton={pendingbutton}
              ></Todostable>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
