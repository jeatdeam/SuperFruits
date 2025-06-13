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
        shadowItem: '0px 0px 10px rgba(0, 0, 0, 1);',
        shadowCard: '0px 0px 5px rgba(0, 0, 0, .8);',
        shadowButton: '0px 0px 5px rgba(0, 0, 0, .5);',
        shadowElement: '0px 0px 2px rgba(0, 0, 0, .8);',
      },
      fontSize: {
        titleResponsive: "clamp(35px, 10vw, 60px)",
      },
    },
  },
  plugins: [],
}

export default config
