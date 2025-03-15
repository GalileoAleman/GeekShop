import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A2E66',
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-bg': '#1b262e'
      },
    },
  },
  plugins: [],
} satisfies Config;
