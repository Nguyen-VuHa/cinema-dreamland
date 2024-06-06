

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-layout': "url('/background-cinema.jpg')",
      },
      colors: {
        'layout-primary': '#1a191f',
        'layout-second': '#222028',
        'primary': '#f9ab00',
        'input-place': '#a7a4aa',
        'hover': '#f9ab000d',
        'error': '#ef4444',
        'warning': '#f97316',
        'success': '#22c55e',
        'white': '#fff',
      },
      // spacing: {
      //   'text': '1rem',
      //   // Thêm các giá trị pixel chuẩn khác nếu cần
      // },
    },
  },
  plugins: [],
};
