import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-12 text-gray-600 text-sm">
      &copy; {new Date().getFullYear()} Tenly. All rights reserved.
    </footer>
  );
};
