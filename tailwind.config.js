module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      // TODO: clean up
      colors: {
        "blue-300": "#56CCF2",
        "blue-500": "#2F80ED",
        "gray-200": "#828282",
        "gray-400": " #BDBDBD",
        "gray-700": "#4f4f4f",
        "green-600": "#27AE60",
        "orange-600": "#FFa500",
      },
    },
  },
  typography: {
    default: {
      css: {
        maxWidth: "70vw",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
