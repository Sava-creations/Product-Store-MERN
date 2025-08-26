export default {
  darkMode: "class",  // enabling dark mode via class strategy
  //If the <html> tag has class="dark", Tailwind will apply all the dark: styles then apply all rules like dark:bg-gray-900, dark:text-white . If not, it uses the normal (light) styles.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
}