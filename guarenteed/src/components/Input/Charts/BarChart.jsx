import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import axiosConfig from "../../../config/axiosConfig";
import { setHeader } from "../../../utils/setHeader";

function BarChart() {
  const [years, setyears] = useState([]);
  const [count, setcount] = useState([]);
  const [pending, setpending] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const data = await axiosConfig.get(
        "/admin/get-yearwise-data",
        setHeader()
      );
      setyears(data.data.data[0]);
      setcount(data.data.data[1]);
      setpending(data.data.data[2]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Line
        data={{
          labels: years,
          datasets: [
            {
              label: "No of Registration Per year",
              data: count,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)"],
              borderWidth: 1,
            },
            {
              label: "No of Pending Registration Per year",
              data: pending,
              backgroundColor: [
                "rgba(99, 206, 255, 0.2)",
                "rgba(86, 64, 255, 0.2)",
              ],
            },
          ],
        }}
        height={100}
        width={100}
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

export default BarChart;
