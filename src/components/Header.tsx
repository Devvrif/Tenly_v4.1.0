import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          {/* Simple SVG Logo */}
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fontSize="10"
              fill="currentColor"
              fontFamily="Poppins, sans-serif"
            >
              T
            </text>
          </svg>
          <span className="font-poppins font-bold text-xl text-primary">Tenly</span>
        </div>

        {/* Navigation */}
        <nav className="space-x-6 flex items-center">
          <a href="/" className="text-gray-700 hover:text-primary font-medium">Home</a>
          <a href="/about" className="text-gray-700 hover:text-primary font-medium">About</a>
          <button
            aria-label="User account"
            className="text-gray-700 hover:text-primary focus:outline-none"
          >
            {/* User icon (simple SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A7 7 0 0112 15a7 7 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};
