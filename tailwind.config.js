/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.3' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        ripple: 'ripple 600ms ease-out',
        'slide-down': 'slide-down 200ms ease-out',
        'slide-up': 'slide-up 200ms ease-out',
      },
      zIndex: {
        9998: '9998',
        9999: '9999',
      },
    },
  },
  plugins: [],
};
