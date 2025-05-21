import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../lib/api";
import ComplaintForm from "../../components/ComplaintForm";
import ComplaintList from "../../components/dashboard/ComplaintList";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardNav from "../../components/dashboard/DashboardNav";

const ComplaintsPage = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await api.get("/users/getcomplaint?limit=20");
        setComplaints(response.data.data);
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleNewComplaint = (newComplaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
    setShowForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Complaints</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              + New Complaint
            </button>
          </div>

          {/* Complaint Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <ComplaintForm onSubmit={handleNewComplaint} />
                <button
                  onClick={() => setShowForm(false)}
                  className="mt-4 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Complaint List */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <ComplaintList
              complaints={complaints}
              emptyMessage="You haven't filed any complaints yet"
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ComplaintsPage;
