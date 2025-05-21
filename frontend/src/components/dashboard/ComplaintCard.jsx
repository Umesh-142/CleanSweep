// const ComplaintCard = ({ complaint }) => {
//   const statusColors = {
//     resolved: "bg-green-100 text-green-800",
//     pending: "bg-yellow-100 text-yellow-800",
//     "in-progress": "bg-blue-100 text-blue-800",
//   };

//   return (
//     <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="font-medium">{complaint.title}</h3>
//           <p className="text-sm text-gray-600 line-clamp-2">
//             {complaint.description}
//           </p>
//         </div>
//         <span
//           className={`px-2 py-1 text-xs rounded-full ${
//             statusColors[complaint.status]
//           }`}
//         >
//           {complaint.status}
//         </span>
//       </div>
//       <div className="mt-2 flex justify-between text-sm text-gray-500">
//         <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
//         <span className="capitalize">{complaint.category}</span>
//       </div>
//     </div>
//   );
// };

// export default ComplaintCard;

const ComplaintCard = ({ complaint }) => {
  const statusColors = {
    resolved: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{complaint.title}</h3>
          <p className="text-gray-600 mt-1">{complaint.description}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            statusColors[complaint.status] || statusColors.pending
          }`}
        >
          {complaint.status.replace("-", " ")}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <span className="bg-gray-100 px-2 py-1 rounded">
          {complaint.category}
        </span>
        <span className="text-gray-500">
          {new Date(complaint.createdAt).toLocaleDateString()}
        </span>
        {complaint.photo && (
          <button
            onClick={() => window.open(complaint.photo, "_blank")}
            className="text-blue-500 hover:underline"
          >
            View Photo
          </button>
        )}
      </div>
    </div>
  );
};

export default ComplaintCard;
