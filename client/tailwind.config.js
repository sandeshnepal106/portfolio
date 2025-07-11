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

        // Option 1: Subtle & Professional (Blue-Purple-Pink-Orange)
        'elite-gradient-1': 'linear-gradient(135deg, #1A202C, #2C5282, #6B46C1, #D53F8C, #F6AD55)',

        // Option 2: Vibrant & Modern (Teal-Purple-Pink)
        'elite-gradient-2': 'linear-gradient(135deg, #06B6D4, #7C3AED, #EC4899)',

        // Option 3: Deep & Rich (Dark Blue-Green-Purple)
        'elite-gradient-3': 'linear-gradient(135deg, #0F172A, #164E63, #4C1D95, #6D28D9)',

        // Option 4: Soft & Elegant (Pastel Peach-Pink-Blue)
        'elite-gradient-4': 'linear-gradient(135deg, #FAD0C4, #FAD0C4, #FFD700, #A1C4FD, #C2EBF7)',

        // Option 5: Futuristic & Dark (Dark Teal-Blue-Purple)
        'elite-gradient-5': 'linear-gradient(135deg, #0F172A, #1E3A8A, #06B6D4, #7C3AED)',


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