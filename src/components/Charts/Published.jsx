import { Chart } from "react-google-charts";
import moment from "moment";

const Published = ({ data }) => {
  const counts = {};
  data.forEach((item) => {
    const date = moment(item.published).format("MMM-yyyy");
    if (date !== null) {
      if (counts[date]) {
        counts[date] += 1;
      } else {
        counts[date] = 1;
      }
    }
  });

  const chartData = [["Date", "Count"]];
  Object.keys(counts).forEach((date) => {
    chartData.push([date ? date : "N/A", counts[date]]);
  });

  return (
    <>
      <h3
        style={{
          color: "#424594",
          fontFamily: "Inter",
          marginLeft: "10px",
          marginBottom: "-10px",
        }}
      >
        Publication Distribution
      </h3>
      <h3
        style={{
          color: "#424594",
          fontFamily: "Inter",
          marginLeft: "10px",
        }}
      >
        -by the year they were published
      </h3>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="BarChart"
        // loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          series: {
            0: { color: "#424594" },
          },
          fontFamily: "Inter",
          backgroundColor: "transparent",
          chart: {
            title: "Publication Distribution",
            subtitle: "Number of items published by month/year",
          },
          legend: { position: "none" },
          hAxis: { title: "Count" },
          vAxis: { title: "Month/Year" },
        }}
      />
    </>
  );
};

export default Published;
