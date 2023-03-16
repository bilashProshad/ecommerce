import "./DoughnutChart.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ inStock, outOfStock }) => {
  const data = {
    labels: ["In Stock", "Out of Stock"],
    datasets: [
      {
        label: "# of Votes",
        data: [inStock, outOfStock],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="doughnut-chart">
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;
