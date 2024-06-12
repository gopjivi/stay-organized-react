import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data, options }) => {
  return (
    <div style={{ alignContent: "end" }}>
      <h5>Tasks by Category</h5>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
