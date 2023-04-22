import React from "react";
import { Chart } from "react-google-charts";

const Country = ({ data }) => {
  const countryCounts = {};
  data.forEach((item) => {
    const country = item.country;
    if (country !== null) {
      if (countryCounts[country]) {
        countryCounts[country] += 1;
      } else {
        countryCounts[country] = 1;
      }
    }
  });

  const chartData = [["Country", "Count"]];
  Object.keys(countryCounts).forEach((country) => {
    chartData.push([country ? country : "N/A", countryCounts[country]]);
  });

  return (
    <div>
      <h3 style={{ color: "#424594", fontFamily: "Inter", marginLeft: "10px" }}>
        Country wise distribution
      </h3>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
              console.log("Selected : " + region);
            },
          },
        ]}
        chartType="GeoChart"
        width="100%"
        height="300px"
        data={chartData}
        options={{
          title: "Distribution by Country",
          backgroundColor: "transparent",
          region: "world",
          colorAxis: { colors: ["#E0EAF1", "#1B435D"] },
        }}
      />
    </div>
  );
};

export default Country;
