import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import { api } from "../lib/api.js";
import PieChart from "./PieChart.jsx";

const AREAS = [
  "Vijay Nagar",
  "Palasia",
  "Mahalaxmi Nagar",
  "Nipania",
  "Bengali Square",
  "LIG Colony",
  "Navlakha",
  "Vidur Nagar",
  "Chandan Nagar",
  "Super Corridor",
  "Other",
];

const AreaStatusForm = () => {
  const [formData, setFormData] = useState({ area: "" });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.area) {
      setError("Please select an area");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/users/getAreaStats", formData);
      setStats(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch area stats");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Area Status Report
      </h2>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Area
            </label>
            <select
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">-- Select Area --</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={loading || !formData.area}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Generating Report..." : "Generate Report"}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>

      {loading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      {stats && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            {formData.area} - Complaint Statistics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <PieChart
                data={{
                  resolved: stats.resolved,
                  pending: stats.pending,
                  inProgress: stats.inProgress,
                }}
              />
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-medium mb-4">Detailed Breakdown</h4>
              <div className="space-y-3">
                <StatItem label="Total Complaints" value={stats.total} />
                <StatItem
                  label="Resolved"
                  value={stats.resolved}
                  color="bg-green-100 text-green-800"
                />
                <StatItem
                  label="Pending"
                  value={stats.pending}
                  color="bg-yellow-100 text-yellow-800"
                />
                <StatItem
                  label="In Progress"
                  value={stats.inProgress}
                  color="bg-blue-100 text-blue-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for stats display
const StatItem = ({ label, value, color = "bg-gray-100 text-gray-800" }) => (
  <div className={`flex justify-between items-center p-3 rounded-lg ${color}`}>
    <span>{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

export default AreaStatusForm;
