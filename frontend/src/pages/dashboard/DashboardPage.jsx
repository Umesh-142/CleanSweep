import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../lib/api";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardNav from "../../components/dashboard/DashboardNav.jsx";
import StatsCards from "../../components/dashboard/StatsCard";
import ComplaintList from "../../components/dashboard/ComplaintList";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0 });
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, complaintsRes] = await Promise.all([
          api.get("/users/stats"),
          api.get("/users/getcomplaint?limit=5"),
        ]);
        setStats(statsRes.data.data);
        setRecentComplaints(complaintsRes.data.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-2xl font-bold mb-6">Welcome, {user?.fullName}</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              <StatsCards stats={stats} />
              <ComplaintList
                complaints={recentComplaints}
                title="Recent Complaints"
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
