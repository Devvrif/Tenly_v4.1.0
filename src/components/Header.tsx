import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo Section - Left */}
        <a href="/" className="flex items-center space-x-3">
          {/* Small square gradient logo */}
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-lg shadow flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-900">Tenly</span>
            <span className="text-xs text-gray-500 -mt-1">News Hub</span>
          </div>
        </a>

        {/* Navigation Buttons - Right */}
        <div className="flex items-center space-x-3">
          {/* Home Button */}
          <a
            href="/"
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center space-x-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="hidden sm:inline text-sm font-medium">Home</span>
          </a>

          {/* Favorites Button */}
          <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-500 flex items-center space-x-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="hidden sm:inline text-sm font-medium">
              Favorites
            </span>
          </button>

          {/* Login Button */}
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center space-x-1 shadow">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
