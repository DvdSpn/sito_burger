/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      // Brand tokens — see design_guidelines.json for when to use each one.
      colors: {
        brand: {
          bg: "#0c0a09", // stone-950: page and panel background
          surface: "#1c1917", // stone-900: dialogs, inputs, inactive chips
          line: "#292524", // stone-800: dividers and card borders
          "line-strong": "#78716c", // stone-500: borders of inputs and secondary buttons (4.1:1)
          ink: "#fafaf9", // stone-50: headings, dish names
          accent: "#d97706", // amber-600: primary button, active filter, Specialità badge
          "accent-strong": "#f59e0b", // amber-500: prices, kickers, hover of primary
          whatsapp: "#25d366", // only for actions that open WhatsApp
        },
      },
      zIndex: {
        bar: "30", // sticky headers and filter bar
        fab: "40", // floating cart button
        panel: "50", // cart drawer, mobile menu
        modal: "60", // confirm dialog, wine sheet, lightbox
        skip: "70", // "Salta al menu" link
      },
    },
  },
  plugins: [],
};
