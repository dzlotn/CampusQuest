/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#141414",
        "surface-hover": "#1a1a1a",
        border: "#262626",
        "border-muted": "#1f1f1f",
        primary: "#94D1BE",
        "primary-hover": "#7ab8a5",
        "primary-muted": "rgba(148, 209, 190, 0.12)",
        muted: "#71717a",
        "muted-foreground": "#a1a1aa",
      },
      fontSize: {
        "page-title": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        "section-title": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "card-title": ["0.9375rem", { lineHeight: "1.25rem", fontWeight: "500" }],
      },
      borderRadius: {
        card: "0.75rem",
        button: "0.5rem",
        input: "0.5rem",
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.4)",
        "card-hover": "0 4px 12px -2px rgb(0 0 0 / 0.4)",
      },
      spacing: {
        page: "1.5rem",
        section: "2rem",
        block: "1rem",
      },
      maxWidth: {
        "content": "72rem",
      },
    },
  },
  plugins: [],
};
