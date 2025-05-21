import React from "react";

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullPage ? "fixed inset-0 z-50 bg-black bg-opacity-60" : ""
      }`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </div>
  );
};

export default LoadingSpinner;
