import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ["Resolved", "Pending", "In Progress"],
    datasets: [
      {
        data: [data.resolved, data.pending, data.inProgress],
        backgroundColor: [
          "#10B981", // Green for resolved
          "#F59E0B", // Amber for pending
          "#3B82F6", // Blue for in progress
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
