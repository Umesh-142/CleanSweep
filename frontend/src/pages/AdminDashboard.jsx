// import { useState, useEffect } from "react";
// import { api } from "../lib/api";
// import ComplaintTable from "../components/admin/ComplaintTable";
// import AreaStatsCard from "../components/dashboard/StatsCard";
// import MapView from "../pages/Complaints3DMap";

// export default function AdminDashboard() {
//   const [complaints, setComplaints] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [selectedArea, setSelectedArea] = useState("Vijay Nagar");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [complaintsRes, statsRes] = await Promise.all([
//           api.get("/admin/complaints"),
//           api.get(`/admin/stats/area?area=${selectedArea}`),
//         ]);
//         setComplaints(complaintsRes.data.data);
//         setStats(statsRes.data.data);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     };
//     fetchData();
//   }, [selectedArea]);

//   const updateStatus = async (complaintId, newStatus) => {
//     try {
//       await api.patch(`/admin/complaints/${complaintId}/status`, {
//         status: newStatus,
//       });
//       setComplaints(
//         complaints.map((c) =>
//           c._id === complaintId ? { ...c, status: newStatus } : c
//         )
//       );
//       toast.success("Status updated");
//     } catch (error) {
//       toast.error("Update failed");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//         <div className="lg:col-span-2">
//           <ComplaintTable
//             complaints={complaints}
//             onStatusChange={updateStatus}
//           />
//         </div>
//         <div>
//           <AreaStatsCard
//             stats={stats}
//             area={selectedArea}
//             onAreaChange={setSelectedArea}
//           />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow">
//         <MapView complaints={complaints} />
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { toast } from "react-hot-toast";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("users/getForAdmin");
        setComplaints(res.data.data);
      } catch (error) {
        toast.error("Failed to load complaints");
      }
    };
    fetchComplaints();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Area</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-b">
                <td className="px-4 py-2">{complaint._id.slice(-6)}</td>
                <td className="px-4 py-2">{complaint.title}</td>
                <td className="px-4 py-2">{complaint.status}</td>
                <td className="px-4 py-2">{complaint.Area}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
