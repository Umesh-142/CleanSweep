import { NavLink } from "react-router-dom";
import { Home, AlertCircle, MapPin, LogOut, Map } from "lucide-react";
import { Logo } from "../shared/Logo";

const DashboardNav = () => {
  const navItems = [
    { title: "Dashboard", icon: Home, href: "/dashboard" },
    { title: "Complaints", icon: AlertCircle, href: "/dashboard/complaints" },
    { title: "Area Status", icon: MapPin, href: "/dashboard/area-status" },
    { title: "Map", icon: Map, href: "http://127.0.0.1:5500/index.html" },
    { title: "Logout", icon: LogOut, href: "/logout" },
  ];

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 border-b">
        <Logo />
      </div>
      <nav className="p-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg mb-1 ${
                isActive ? "bg-green-50 text-green-600" : "hover:bg-gray-50"
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.title}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardNav;
