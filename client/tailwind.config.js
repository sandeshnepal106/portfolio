// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
          '100%': { 'background-position': '0% 0%' },
        },
      },
      animation: {
        'gradient-tilted': 'gradient 12s ease-in-out infinite', // You can adjust speed (e.g., 12s, 15s, 20s)
      },
      backgroundSize: {
        '400': '400% 400%',
        '300': '300% 300%', // Added for more flexibility with gradient sizes
        '200': '200% 200%',
      },
      backgroundImage: {
        // --- ELITE GRADIENT OPTIONS ---

        // Option 1: Midnight Tech (Dark Navy - Steel Blue - Indigo)
  'elite-gradient-1': 'linear-gradient(135deg, #0B0C10, #1F2833, #283149, #3C3F58)',

  // Option 2: Deep Void (Charcoal - Teal - Purple)
  'elite-gradient-2': 'linear-gradient(135deg, #1A1A1D, #0F4C5C, #2C2A4A)',

  // Option 3: Galactic Night (Dark Blue - Deep Purple - Magenta)
  'elite-gradient-3': 'linear-gradient(135deg, #0D1B2A, #1B263B, #415A77, #6D597A)',

  // Option 4: Dark Aurora (Dark Cyan - Forest Green - Indigo)
  'elite-gradient-4': 'linear-gradient(135deg, #0F3D3E, #1B4242, #4C3575)',

  // Option 5: Cyber Noir (Almost Black - Gunmetal - Neon Purple)
  'elite-gradient-5': 'linear-gradient(135deg, #0A0A0A, #1F1F1F, #2B2D42, #8D00FF)',


        // You can uncomment and use any of the above, or combine elements.
        // For example, to use 'elite-gradient-2':
        // 'your-chosen-gradient': 'linear-gradient(135deg, #06B6D4, #7C3AED, #EC4899)',
      },
      fontFamily: {
        // --- MODERN FONT OPTIONS ---
        // Add these to your project, usually by linking from Google Fonts or self-hosting.

        // Option 1: Inter (Excellent all-rounder, very popular)
        inter: ['Inter', 'sans-serif'],

        // Option 2: Plus Jakarta Sans (Clean, modern, geometric)
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],

        // Option 3: Poppins (Soft, rounded, friendly)
        poppins: ['Poppins', 'sans-serif'],

        // Option 4: DM Sans (Minimalist, versatile)
        'dm-sans': ['"DM Sans"', 'sans-serif'],

        // Option 5: Montserrat (Geometric, strong, good for headlines)
        montserrat: ['Montserrat', 'sans-serif'],

        // Option 6: General UI font stack for good fallback
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],

        sigmar: ['Sigmar', 'cursive'],
      },
    },
  },
  plugins: [],
}