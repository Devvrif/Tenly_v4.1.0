import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 group">
      {/* Gradient Icon */}
      <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 via-purple-600 to-pink-500 rounded-xl shadow-lg flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Tenly
        </span>
        <span className="text-xs text-gray-500 -mt-0.5">News Hub</span>
      </div>
    </div>
  );
};

export default Logo;
