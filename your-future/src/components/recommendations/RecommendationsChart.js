// import React from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

function RecommendationsChart(props) {
  const { data } = props;
  const count = (field) => {
    /*
        1. for...in... iterate through all keys in an object
        2. key in countDict test if key exists in the dictionary
        3. Object.keys(countDict) returns the list of keys
        4. Object.values(countDict) returns the list of counts
      */
    const countDict = {};
    for (let i = 0; i++; i < data.length) {
      const key = data[i][field]; //this is one of the values to count
      if (key in countDict) countDict[key] = countDict[key] + 1;
      else countDict[key] = 0;
    }
    return countDict;
  };

  const dict = count("Location");
  const labels = Object.keys(dict);
  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: Object.values(dict),
      },
    ],
  };

  return <div></div>;
}

export default RecommendationsChart;
