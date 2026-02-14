/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary))",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary))",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive))",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted))",
          foreground: "oklch(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "oklch(var(--accent))",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        "fun-pink-light": "oklch(var(--fun-pink-light))",
        "fun-pink": "oklch(var(--fun-pink))",
        "fun-red-light": "oklch(var(--fun-red-light))",
        "fun-red": "oklch(var(--fun-red))",
        "fun-red-dark": "oklch(var(--fun-red-dark))",
        "fun-purple-light": "oklch(var(--fun-purple-light))",
        "fun-purple": "oklch(var(--fun-purple))",
        "fun-gold": "oklch(var(--fun-gold))",
        "fun-gold-light": "oklch(var(--fun-gold-light))",
        "fun-text": "oklch(var(--fun-text))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        playful: ["Fredoka", "sans-serif"],
        script: ["Pacifico", "cursive"],
      },
      boxShadow: {
        fun: "0 10px 30px -5px rgba(255, 105, 135, 0.3)",
        "fun-xl": "0 20px 50px -10px rgba(255, 105, 135, 0.4)",
      },
      dropShadow: {
        fun: "0 10px 20px rgba(255, 105, 135, 0.3)",
      },
      animation: {
        "gentle-float": "gentle-float 3s ease-in-out infinite",
        "gentle-bounce": "gentle-bounce 2s ease-in-out infinite",
        "envelope-slide": "envelope-slide 0.8s ease-out forwards",
        "letter-unfold": "letter-unfold 1s ease-out forwards",
        "ticket-reveal": "ticket-reveal 1s ease-out forwards",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "fade-in": "fade-in 1s ease-out forwards",
        "float-slow": "float-slow 20s ease-in-out infinite",
        "float-medium": "float-medium 15s ease-in-out infinite",
        "float-fast": "float-fast 10s ease-in-out infinite",
      },
      keyframes: {
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gentle-bounce": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "envelope-slide": {
          "0%": {
            opacity: "0",
            transform: "translateY(-100px) scale(0.8)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
          },
        },
        "letter-unfold": {
          "0%": {
            opacity: "0",
            transform: "scale(0.8) rotateX(-90deg)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotateX(0deg)",
          },
        },
        "ticket-reveal": {
          "0%": {
            opacity: "0",
            transform: "scale(0.5) rotate(-10deg)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg)",
          },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(0) translateX(-50%)",
          },
          "50%": {
            transform: "translateY(-10px) translateX(-50%)",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "33%": {
            transform: "translate(30px, -30px) rotate(5deg)",
          },
          "66%": {
            transform: "translate(-20px, 20px) rotate(-5deg)",
          },
        },
        "float-medium": {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "33%": {
            transform: "translate(-25px, 25px) rotate(-3deg)",
          },
          "66%": {
            transform: "translate(25px, -25px) rotate(3deg)",
          },
        },
        "float-fast": {
          "0%, 100%": {
            transform: "translate(0, 0) rotate(0deg)",
          },
          "33%": {
            transform: "translate(20px, 30px) rotate(4deg)",
          },
          "66%": {
            transform: "translate(-30px, -20px) rotate(-4deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
