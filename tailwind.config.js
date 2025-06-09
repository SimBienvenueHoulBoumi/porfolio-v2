// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
      fadeInUp: {
        '0%': { opacity: 0, transform: 'translateY(30px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      'gradient-move': {
        '0%,100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
    },
    animation: {
      fadeInUp: 'fadeInUp 1.1s cubic-bezier(.16,1.01,.43,.98) 1 both',
      'gradient-move': 'gradient-move 6s ease-in-out infinite',
    },
    },
  },
  plugins: [],
};
