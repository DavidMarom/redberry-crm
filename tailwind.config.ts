import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
    }
  },
  darkMode: "class",
  plugins: [nextui(
    {
      themes:{
        light:{
          layout:{},
          colors:{  
            background:"FFFFFF",
            default:{
              DEFAULT:'#652C16',
              "50":"#E7DCD6",
              "100":"#7d7d7d"
            },
            danger:{
              DEFAULT:"#DA2249",
              "50":"#F9A9C4"
            }

          }
        },
        dark:{
          layout:{},
          colors:{

          }
        }
      }
    }
  )]
}
export default config
