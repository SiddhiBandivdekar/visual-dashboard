import React from "react";
import { Chart } from "react-google-charts";

const Topics = ({ data }) => {
  const topicCounts = {};
  data.forEach((item) => {
    const topic = item.topic;
    if (topic !== null) {
      if (topicCounts[topic]) {
        topicCounts[topic] += 1;
      } else {
        topicCounts[topic] = 1;
      }
    }
  });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const chartData = [["Topic", "Count", { role: "style" }]];
  Object.keys(topicCounts).forEach((topic, index) => {
    const color = getRandomColor();
    chartData.push([topic ? topic : "N/A", topicCounts[topic], color]);
  });

  return (
    <div>
      <h3
        style={{
          color: "#424594",
          fontFamily: "Inter",
          marginLeft: "10px",
          marginBottom: "-40px",
        }}
      >
        Topics
      </h3>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
        // loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          backgroundColor: "transparent",
          legend: { position: "right" },
        }}
      />
    </div>
  );
};

export default Topics;
