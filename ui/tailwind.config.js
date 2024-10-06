/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "soft-xl": "0 10px 15px rgba(0, 0, 0, 0.10)", // Customize shadow to your liking
      },
      keyframes: {
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        typing: "typing 3.5s steps(40, end)",
        blink: "blink .75s step-end infinite",
      },
    },
  },
  plugins: [],
};
