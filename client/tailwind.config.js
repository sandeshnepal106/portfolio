// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          pink: '#ec4899',
          violet: '#7c3aed',
        },
        surface: {
          DEFAULT: 'rgba(255,255,255,0.03)',
          hover: 'rgba(255,255,255,0.06)',
        },
      },
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'border-spin': {
          '100%': { '--angle': '360deg' },
        },
      },
      animation: {
        'gradient': 'gradient 6s ease infinite',
        'float': 'float 5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'glow-pulse': 'glow 3s ease-in-out infinite',
      },
      backgroundSize: {
        '400': '400% 400%',
        '300': '300% 300%',
        '200': '200% 200%',
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(34,211,238,0.08) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'glow-purple': 'radial-gradient(ellipse at center, rgba(168,85,247,0.4) 0%, transparent 70%)',
        'glow-cyan': 'radial-gradient(ellipse at center, rgba(34,211,238,0.3) 0%, transparent 70%)',
        'text-gradient': 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
        'accent-gradient': 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sigmar: ['Sigmar', 'cursive'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(168, 85, 247, 0.3)',
        'glow': '0 0 30px rgba(168, 85, 247, 0.4)',
        'glow-lg': '0 0 60px rgba(168, 85, 247, 0.5)',
        'glow-cyan': '0 0 30px rgba(34, 211, 238, 0.3)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255,255,255,0.05)',
        'card-hover': '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(168, 85, 247, 0.2)',
      },
    },
  },
  plugins: [],
};