import React from "react";
import Chart from "react-google-charts";

const Intensity = ({ data }) => {
  const intensityCounts = {};
  data?.forEach((item) => {
    const intensity = item.intensity;
    const range = `${Math.floor(intensity / 5) * 5 + 1}-${
      Math.floor(intensity / 5) * 5 + 5
    }`;
    if (intensity !== null) {
      if (intensityCounts[range]) {
        intensityCounts[range] += 1;
      } else {
        intensityCounts[range] = 1;
      }
    }
  });

  const chartData = [["Range", "Count"]];
  for (let i = 1; i <= 80; i += 5) {
    const range = `${i}-${i + 4}`;
    chartData.push([range ? range : "N/A", intensityCounts[range] || 0]);
  }

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
        Intensity counts by Range
      </h3>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="BarChart"
        // loader={<div>Loading Chart</div>}
        data={chartData}
        options={{
          fontFamily: "Inter",
          backgroundColor: "transparent",
          chartArea: { width: "70%" },
          hAxis: {
            title: "Intensity Range",
            minValue: 0,
          },
          series: {
            0: { color: "#424594" },
          },
          vAxis: {
            title: "Count",
          },
        }}
      />
    </>
  );
};

export default Intensity;
