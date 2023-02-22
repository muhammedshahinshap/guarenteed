import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import axiosConfig from "../../../config/axiosConfig";
import { setHeader } from "../../../utils/setHeader";

function PieChart() {
  const [count, setcount] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-no-of-premiums",
        setHeader()
      );
      setcount(data.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Pie
        data={{
          labels: ["Not Premium", "Premium"],
          datasets: [
            {
              label: "No of Member",
              data: count,
              backgroundColor: [
                "rgba(255, 0, 55, 0.793)",
                "rgba(58, 214, 19, 0.777)",
              ],
              borderColor: [
                "rgba(255, 0, 55, 0.793)",
                "rgba(58, 214, 19, 0.777)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default PieChart;
