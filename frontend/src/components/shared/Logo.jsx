import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <img
        src="../../Pictures/Logo.png"
        alt="CleanSweep Logo"
        className="h-24 w-25 rounded-full"
      />
      <span className="font-bold text-xl text-gray-800"></span>
    </Link>
  );
}
