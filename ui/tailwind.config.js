/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "soft-xl": "0 10px 15px rgba(0, 0, 0, 0.10)", // Customize shadow to your liking
      },
      borderImage: {
        "gradient-to-r":
          "linear-gradient(to right, var(--tw-gradient-stops)) 1",
      },
    },
  },
  plugins: [],
};
