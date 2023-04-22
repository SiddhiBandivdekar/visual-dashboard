import React from "react";
import Chart from "react-google-charts";

const Likelihood = ({ data }) => {
  const likelihoodCounts = {};
  data.forEach((item) => {
    const likelihood = item.likelihood;
    if (likelihood !== null) {
      if (likelihoodCounts[likelihood]) {
        likelihoodCounts[likelihood] += 1;
      } else {
        likelihoodCounts[likelihood] = 1;
      }
    }
  });

  const chartData = [["Likelihood", "Count"]];
  Object.keys(likelihoodCounts).forEach((likelihood) => {
    chartData.push([likelihood ? likelihood : "N/A", likelihoodCounts[likelihood]]);
  });

  return (
    <>
      <h3
        style={{
          color: "#424594",
          fontFamily: "Inter",
          marginLeft: "10px",
          marginBottom: "-40px",
        }}
      >
        Distribution of Likelihood
      </h3>
      <Chart
        chartType="ColumnChart"
        data={chartData}
        options={{
          backgroundColor: "transparent",
          legend: { position: "none" },
          vAxis: {
            title: "Count",
          },
          hAxis: {
            title: "Likelihood",
          },
          series: {
            0: { color: "#424594" },
          },
        }}
        width={"100%"}
        height={"300px"}
      />
    </>
  );
};

export default Likelihood;
