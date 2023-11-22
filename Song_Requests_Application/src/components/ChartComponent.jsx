import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
import "../App.css";

const ChartComponent = ({ categories, amounts }) => {
  const state = {
    labels: categories,
    datasets: [
      {
        backgroundColor: "#F0C3F1",
        data: amounts,
        color: "#F0C3F1",
        barPercentage: "0.4",
        hoverBackgroundColor: "#F0C3F1",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        border: {
          color: "#ffffff",
        },
      },
      y: {
        title: "r",
        beginAtZero: true,
        border: {
          color: "#ffffff",
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    borderRadius: 5,
    elements: {
      line: {
        borderColor: "green", // Color of axis lines
        borderWidth: 1, // Width of axis lines
      },
    },
  };

  return (
    <div className="bar-chart">
      <Bar data={state} options={options} />
    </div>
  );
};

export default ChartComponent;
