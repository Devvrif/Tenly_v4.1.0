/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#2563EB', // Example blue, adjust to your brand color
      },
    },
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  // your existing config ...
  plugins: [
    require('@tailwindcss/line-clamp'),
    // other plugins if any
  ],
}


