/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-grey": "#232323",
      },
      screens: {
        sm: "640px", // Small screens (e.g., mobile phones)
        md: "768px", // Medium screens (e.g., tablets)
        lg: "1024px", // Large screens (e.g., laptops)
        xl: "1280px", // Extra-large screens (e.g., desktops)
      },
    },
  },
  plugins: [],
};
