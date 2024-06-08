import { useFetch } from "../services/useFetch";
import { useEffect, useState } from "react";

export default function Cards() {
  const [categorieslength, setCategoriesLength] = useState(0);
  const [usersLength, setUsersLength] = useState(0);
  const [todosLength, seTodosLength] = useState(0);

  const categoriesApiUrl = "http://localhost:8083/api/categories";
  const usersApiUrl = "http://localhost:8083/api/users";
  const todosApiUrl = "http://localhost:8083/api/todos";
  const [usersData] = useFetch(usersApiUrl);
  const [todosData] = useFetch(todosApiUrl);
  const [categoriesData] = useFetch(categoriesApiUrl);

  useEffect(() => {
    if (categoriesData) {
      setCategoriesLength(categoriesData.length);
      console.log(categoriesData.length);
    }
  }, [categoriesData]);

  useEffect(() => {
    if (usersData) {
      setUsersLength(usersData.length);
      console.log(usersData.length);
    }
  }, [usersData]);
  useEffect(() => {
    if (todosData) {
      seTodosLength(todosData.length);
      console.log(todosData.length);
    }
  }, [todosData]);

  return (
    <div className="row tablediv topmargin">
      <div className="col-6 col-lg-3 col-md-6 carddiv">
        <div className="card">
          <div className="card-body px-4 py-4-5">
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-center">
                <div className="stats-icon purple mb-2">
                  <i className="bi bi-person-fill"></i>
                </div>
              </div>
              <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7 text-center">
                <h6 className="font-semibold">Users</h6>
                <span id="userid" className="font-extrabold mb-0">
                  {usersLength}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3 col-md-6 carddiv">
        <div className="card">
          <div className="card-body px-4 py-4-5">
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-center">
                <div className="stats-icon mb-2">
                  <i className="bi bi-list-task"></i>
                </div>
              </div>
              <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7 text-center">
                <h6 className="font-semibold">Tasks</h6>
                <span id="taskid" className="font-extrabold mb-0">
                  {todosLength}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3 col-md-6 carddiv">
        <div className="card">
          <div className="card-body px-4 py-4-5">
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-center">
                <div className="stats-icon mb-2">
                  <i className="bi bi-filter-square-fill"></i>
                </div>
              </div>
              <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7 text-center">
                <h6 className="font-semibold">Category</h6>
                <span id="categoryid" className="font-extrabold mb-0">
                  {categorieslength}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3 col-md-6 carddiv">
        <div className="card">
          <div className="card-body px-4 py-4-5">
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-center">
                <div className="stats-icon mb-2">
                  <i className="bi bi-tag-fill"></i>
                </div>
              </div>
              <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7 text-center">
                <h6 className="font-semibold">Priority</h6>
                <span className="font-extrabold mb-0">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
