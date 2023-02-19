import "./LineChart.scss";
// ----------------------------------------
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// ----------------------------------------

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ min = 0, max, titleText, labels, label, chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: true,
      // legend: {
      //   position: "top",
      // },
      title: {
        display: true,
        text: titleText,
      },
      scales: {
        y: {
          min: min,
          max: max,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: label,
        data: chartData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="line-chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
