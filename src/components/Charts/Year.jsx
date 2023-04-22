import Chart from "react-google-charts";

const Year = ({ data }) => {
  const yearCounts = {};
  data.forEach((item) => {
    const year = item.start_year;
    if (year !== null) {
      if (yearCounts[year]) {
        yearCounts[year] += 1;
      } else {
        yearCounts[year] = 1;
      }
    }
  });

  const chartData = [["Year", "Count"]];
  console.log(yearCounts);
  Object.keys(yearCounts).forEach((year) => {
    chartData.push([year ? year : "N/A", yearCounts[year]]);
  });

  return (
    <>
      <h3
        style={{
          color: "#424594",
          fontFamily: "Inter",
          marginLeft: "10px",
        }}
      >
        Start Year
      </h3>
      <Chart
        width={"100%"}
        height={"200px"}
        chartType="LineChart"
        // loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          series: {
            0: { color: "#424594" },
          },
          backgroundColor: "transparent",
          chart: {
            title: "Year Distribution",
            subtitle: "Number of items published each year",
          },
          legend: { position: "none" },
        }}
      />
    </>
  );
};

export default Year;
