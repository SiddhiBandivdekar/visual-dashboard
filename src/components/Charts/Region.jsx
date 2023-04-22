import { Chart } from "react-google-charts";

const Region = ({ data }) => {
  const regionCounts = {};
  data.forEach((item) => {
    const region = item.region;
    if (region !== null) {
      if (regionCounts[region]) {
        regionCounts[region] += 1;
      } else {
        regionCounts[region] = 1;
      }
    }
  });

  const chartData = [["Region", "Count"]];
  Object.keys(regionCounts).forEach((region) => {
    chartData.push([region ? region : "N/A", regionCounts[region]]);
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
        Region Distribution
      </h3>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="PieChart"
        // loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          backgroundColor: "transparent",
          chart: {
            title: "Region Distribution",
            subtitle: "Number of items published in each region",
          },
          legend: { position: "right" },
        }}
      />
    </>
  );
};

export default Region;
