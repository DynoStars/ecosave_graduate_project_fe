import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Basic Colors
        black: "#000000",
        white: "#FFFFFF",

        // Primary Colors
        primary: {
          DEFAULT: "#009883", // Màu chính
          dark: "#1E3A8A",   // Biến thể tối hơn
          light: "#058170",  // Biến thể sáng hơn
        },

        // Secondary Colors
        secondary: {
          DEFAULT: "#EDF4F6", // Màu phụ
          dark: "#D8E1E4",   // Biến thể tối hơn
          light: "#F1FCFF",  // Biến thể sáng hơn
        },

        // Status Colors
        error: {
          DEFAULT: "#DC2626",  // Lỗi
          dark: "#B91C1C",
          light: "#F87171",
        },
        success: {
          DEFAULT: "#16A34A",  // Thành công
          dark: "#15803D",
          light: "#4ADE80",
        },

        // Custom Colors
        background: "var(--background)",  // Biến động CSS
        foreground: "var(--foreground)",  // Biến động CSS
      },
    },
  },
  plugins: [],
};

export default config;
