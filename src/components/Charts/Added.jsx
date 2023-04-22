import { Chart } from "react-google-charts";
import moment from "moment";

const Added = ({ data }) => {
  const added = {};
  data.forEach((item) => {
    const date = moment(item.added).format("MMM-yyyy");
    if (date !== null) {
      if (added[date]) {
        added[date] += 1;
      } else {
        added[date] = 1;
      }
    }
  });

  const chartData = [["Date", "Count"]];
  Object.keys(added).forEach((date) => {
    chartData.push([date ? date : "N/A", added[date]]);
  });

  return (
    <>
      <h3 style={{ color: "#424594", marginLeft: "20px" }}>
        Publication Distribution - By added
      </h3>
      <Chart
        width={"100%"}
        height={"300px"}
        chartType="BarChart"
        // loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          fontFamily: "Inter",
          backgroundColor: "transparent",
          color: "#424594",
          series: {
            0: { color: "#424594" },
          },
          chart: {
            title: "Publication Distribution",
            subtitle: "Number of items added by month/year",
          },
          legend: { position: "none" },
          hAxis: { title: "Count" },
          vAxis: { title: "Month/Year" },
        }}
      />
    </>
  );
};

export default Added;
