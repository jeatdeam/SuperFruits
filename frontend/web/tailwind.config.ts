// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "320px",
        xs: "480px",
      },
      boxShadow: {
        shadowItem: '0px 0px 10px rgba(0, 0, 0, 1);'
      }
    },
  },
  plugins: [],
}

export default config
