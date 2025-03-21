/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "25%": { transform: "translateY(-5px) rotate(2deg)" },
          "50%": { transform: "translateY(0) rotate(0deg)" },
          "75%": { transform: "translateY(5px) rotate(-2deg)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
