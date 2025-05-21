import { Menu } from "lucide-react";
import { Button } from "../shared/Button";

const DashboardHeader = ({ toggleSidebar }) => (
  <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
    <Button variant="ghost" onClick={toggleSidebar} className="md:hidden">
      <Menu className="h-5 w-5" />
    </Button>
    <div className="flex items-center space-x-4">
      <span className="font-medium">{new Date().toLocaleDateString()}</span>
    </div>
  </header>
);

export default DashboardHeader;
