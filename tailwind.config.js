/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 tells Tailwind where to look
  ],
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
  plugins: [
    // ⚠️ Remove this if you're on Tailwind v3.3+ (built-in already)
    // require('@tailwindcss/line-clamp'),
  ],
};
