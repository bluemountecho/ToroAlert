module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#002172",
        "primary-blue-lt": "#072C9E",
        "primary-blue-ltr": "rgba(7, 44, 158, 0.55)",
        "primary-blue-ltr-lt": " rgba(7, 44, 158, 0.27)",
        "primary-blue-ltr-ltr": "#103180",

        "primary-yellow": "#FF9C39",
        "primary-green": "#43F940",
        "primary-red": "#FF5935",
        "secondary-green": "#0AB706",

        "neon-green": "#43F940",
        "button-disabled": "rgba(7, 44, 158, 0.12)",

        "secondary-blue": "rgba(0, 33, 114, 0.5)",
        "secondary-blue-lt": "#F4F7FF",
        "secondary-blue-ltr": "rgba(244, 247, 255, 0.8)",
        "secondary-white-lt": " rgba(255, 255, 255, 0.6)",

        "ternary-blue": "#A4BEFF",
        "ternary-blue-lt-lt": "#A7C0FF",
        "ternary-blue-lt": "rgba(7, 44, 158, 0.75)",
        "ternary-blue-ltr": "rgba(164, 190, 255, 0.73)",
        "ternary-blue-ltr-ltr": "rgba(164, 190, 255, 0.25)",
        "ternary-blue-result-bg": "rgba(164, 190, 255, 0.31)",
        "ternary-blue-breadcrumb": "rgba(164, 190, 255, 0.61)",
      },
    },
  },
  plugins: [],
};
