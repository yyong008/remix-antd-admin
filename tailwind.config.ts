import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    theme: {
    extend: {
      animation: {
        'shake': 'shake 0.5s ease-in-out infinite',
      },
      keyframes: {
        shake: {
          '0%, 100%': {
            transform: 'translateX(-10px)',
          },
          '50%': {
            transform: 'translateX(10px)',
          },
        },
      },
    },
  },
  },
} satisfies Config
