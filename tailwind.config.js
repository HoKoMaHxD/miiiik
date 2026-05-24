/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#11100d',
        espresso: '#2c2117',
        parchment: '#fff7e6',
        champagne: '#f4d77b',
        blush: '#f8b9c8',
        mint: '#a9dbc7',
        lavender: '#c6b7ff',
      },
      boxShadow: {
        glow: '0 24px 80px rgba(244, 215, 123, 0.22)',
        soft: '0 18px 55px rgba(35, 27, 17, 0.16)',
      },
      animation: {
        floaty: 'floaty 7s ease-in-out infinite',
        sparkle: 'sparkle 2.6s ease-in-out infinite',
        drift: 'drift 16s linear infinite',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-16px) rotate(2deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0.35, transform: 'scale(0.82)' },
          '50%': { opacity: 1, transform: 'scale(1.08)' },
        },
        drift: {
          from: { transform: 'translateY(-14vh) rotate(0deg)' },
          to: { transform: 'translateY(118vh) rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
