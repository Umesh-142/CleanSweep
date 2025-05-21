import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <img
        src="../../Pictures/Logo.png"
        alt="CleanSweep Logo"
        className="h-40 w-40 rounded-full"
      />
    </Link>
  );
}
