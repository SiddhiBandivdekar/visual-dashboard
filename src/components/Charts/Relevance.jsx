import React from "react";
import { Chart } from "react-google-charts";

const Relevance = ({ data }) => {
  const relevanceCounts = {};
  data.forEach((item) => {
    const relevance = item.relevance;
    if (relevance !== null) {
      if (relevanceCounts[relevance]) {
        relevanceCounts[relevance] += 1;
      } else {
        relevanceCounts[relevance] = 1;
      }
    }
  });

  const relevanceLabels = {
    1: "Extremely Relevant",
    2: "Somewhat Relevant",
    3: "Neutral",
    4: "Slightly Relevant",
    5: "Not Very Relevant",
    6: "Not at All Relevant",
  };

  const chartData = [["Relevance", "Count"]];
  Object.keys(relevanceCounts).forEach((relevance) => {
    chartData.push([
      relevanceLabels[relevance] ? relevanceLabels[relevance] : "N/A",
      relevanceCounts[relevance],
    ]);
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
        Distribution of Relevance
      </h3>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={{
          backgroundColor: "transparent",
          pieSliceText: "value",
        }}
        width={"100%"}
        height={"250px"}
      />
    </div>
  );
};

export default Relevance;
