const StatsCards = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
      <h3 className="text-gray-500 text-sm">Total Complaints</h3>
      <p className="text-2xl font-bold">{stats.total}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
      <h3 className="text-gray-500 text-sm">Resolved</h3>
      <p className="text-2xl font-bold text-blue-600">{stats.resolved}</p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
      <h3 className="text-gray-500 text-sm">Pending</h3>
      <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
    </div>
  </div>
);

export default StatsCards;
