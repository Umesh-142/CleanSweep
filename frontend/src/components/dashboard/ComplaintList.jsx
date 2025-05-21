import ComplaintCard from "./ComplaintCard";

const ComplaintList = ({ complaints, title }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    <div className="space-y-4">
      {complaints.length > 0 ? (
        complaints.map((complaint) => (
          <ComplaintCard key={complaint._id} complaint={complaint} />
        ))
      ) : (
        <p className="text-gray-500">No complaints found</p>
      )}
    </div>
  </div>
);

export default ComplaintList;
