/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {

      colors: {

        background: "#080808",
        foreground: "#ffffff",

        card: "#111111",
        secondary: "#171717",

        border: "#2b2418",

        gold: "#e8b84b",

        muted: "#222222",

        "muted-foreground": "#a3a3a3",

        sidebar: "#0b0b0b",

      },

      fontFamily: {
        sans: [
          "var(--font-vazir)",
          "sans-serif"
        ],
      },

    },
  },

  plugins: [],
}
