export default function ComplaintTable({ complaints, onStatusChange }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">ID</th>
            <th className="px-6 py-3 text-left">Title</th>
            <th className="px-6 py-3 text-left">User</th>
            <th className="px-6 py-3 text-left">Area</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint._id} className="border-t">
              <td className="px-6 py-4">{complaint._id.slice(-6)}</td>
              <td className="px-6 py-4">{complaint.title}</td>
              <td className="px-6 py-4">
                {complaint.createdBy?.fullName || "N/A"}
              </td>
              <td className="px-6 py-4">{complaint.Area}</td>
              <td className="px-6 py-4">
                <select
                  value={complaint.status}
                  onChange={(e) =>
                    onStatusChange(complaint._id, e.target.value)
                  }
                  className={`px-2 py-1 rounded text-sm ${
                    complaint.status === "resolved"
                      ? "bg-green-100"
                      : complaint.status === "inProgress"
                      ? "bg-yellow-100"
                      : "bg-red-100"
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="inProgress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => openComplaintDetail(complaint)}
                  className="text-blue-600 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
