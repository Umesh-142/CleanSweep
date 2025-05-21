// AreaStatusPage.js
import AreaStatusForm from "../../components/AreaStatusForm";
import DashboardNav from "../../components/dashboard/DashboardNav";
import DashboardHeader from "../../components/dashboard/DashboardHeader";

const AreaStatusPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardNav />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <AreaStatusForm />
        </main>
      </div>
    </div>
  );
};

export default AreaStatusPage;
