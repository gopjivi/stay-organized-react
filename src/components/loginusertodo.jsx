import { useFetch } from "../services/useFetch";
import { useEffect, useState } from "react";
import { getTaskByUser } from "../services/taskService";
import PieChart from "./piechart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function LoginUserToDo({ userID }) {
  const [todosLength, seTodosLength] = useState(0);
  const [completedLength, seCompletedLength] = useState(0);
  const [pendingLength, sePendingLength] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (userID) {
      let tasks = getTaskByUser(userID);
      tasks.then((e) => {
        seTodosLength(e.length);
        setChartData(e);
        let filteredTodos = e.filter((todo) => todo.completed === true);
        if (filteredTodos) {
          seCompletedLength(filteredTodos.length);
        }
        let filteredTodosPending = e.filter((todo) => todo.completed === false);
        console.log(filteredTodosPending);
        if (filteredTodosPending) {
          sePendingLength(filteredTodosPending.length);
        }
      });
    }
  }, [userID]);

  const categorizeTasks = (chartData) => {
    const categoryCounts = chartData.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});
    return categoryCounts;
  };

  const taskCounts = categorizeTasks(chartData);

  const data = {
    labels: Object.keys(taskCounts),
    datasets: [
      {
        data: Object.values(taskCounts),
        backgroundColor: [
          "#FF6384", // Red
          "#36A2EB", // Blue
          "#FFCE56", // Yellow
          "#4BC0C0", // Green
          "#9966FF", // Purple
          "#FF9F40", // Orange
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        onClick: null, // Disable legend click
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  return (
    <div className="row tablediv">
      <div className="col-6 col-lg-3 col-md-6 carddiv">
        <div className="card" style={{ marginBottom: 15 }}>
          <div className="card-body px-4 py-4-5">
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-center">
                <div className="stats-icon mb-2">
                  <i className="bi bi-list-task"></i>
                </div>
              </div>
              <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7 text-center">
                <h6 className="font-semibold">Total No of Task</h6>
                <span id="taskid" className="font-extrabold mb-0">
                  {todosLength}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card"
          style={{ marginBottom: 15, backgroundColor: "#ccffdd" }}
        >
          <div className="card-body px-4 py-4-5">
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-center">
                <div className="stats-icon mb-2">
                  <i className="bi bi-list-task"></i>
                </div>
              </div>
              <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7 text-center">
                <h6 className="font-semibold">Completed</h6>
                <span id="taskid" className="font-extrabold mb-0">
                  {completedLength}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="card"
          style={{ marginBottom: 15, backgroundColor: "#ffc2b3" }}
        >
          <div className="card-body px-4 py-4-5">
            <div className="row">
              <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-center">
                <div className="stats-icon mb-2">
                  <i className="bi bi-list-task"></i>
                </div>
              </div>
              <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7 text-center">
                <h6 className="font-semibold">Pending</h6>
                <span id="taskid" className="font-extrabold mb-0">
                  {pendingLength}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 col-lg-3 col-md-6 carddiv"></div>

      <div className="col-6 col-lg-4 col-md-6 carddiv piechartdiv">
        <PieChart data={data} options={options} />
      </div>
    </div>
  );
}
