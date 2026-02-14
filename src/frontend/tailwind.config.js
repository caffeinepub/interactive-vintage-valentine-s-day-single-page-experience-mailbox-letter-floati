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
        "reveal-pop": "reveal-pop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards",
        "sparkle-burst-1": "sparkle-burst-1 1.2s ease-out forwards",
        "sparkle-burst-2": "sparkle-burst-2 1.3s ease-out forwards",
        "sparkle-burst-3": "sparkle-burst-3 1.1s ease-out forwards",
        "sparkle-burst-4": "sparkle-burst-4 1.4s ease-out forwards",
        "sparkle-burst-5": "sparkle-burst-5 1.2s ease-out forwards",
        "sparkle-burst-6": "sparkle-burst-6 1.3s ease-out forwards",
        "sparkle-burst-7": "sparkle-burst-7 1.1s ease-out forwards",
        "sparkle-burst-8": "sparkle-burst-8 1.4s ease-out forwards",
        "sparkle-burst-center": "sparkle-burst-center 1s ease-out forwards",
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
        "reveal-pop": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.1) rotate(2deg)",
          },
          "100%": {
            transform: "scale(1) rotate(0deg)",
          },
        },
        "sparkle-burst-1": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-60px, -60px) scale(1.5) rotate(-180deg)",
          },
        },
        "sparkle-burst-2": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(70px, -50px) scale(1.5) rotate(180deg)",
          },
        },
        "sparkle-burst-3": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50px, 70px) scale(1.5) rotate(-180deg)",
          },
        },
        "sparkle-burst-4": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(60px, 60px) scale(1.5) rotate(180deg)",
          },
        },
        "sparkle-burst-5": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(0, -80px) scale(1.3) rotate(360deg)",
          },
        },
        "sparkle-burst-6": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(0, 80px) scale(1.3) rotate(-360deg)",
          },
        },
        "sparkle-burst-7": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-80px, 0) scale(1.3) rotate(360deg)",
          },
        },
        "sparkle-burst-8": {
          "0%": {
            opacity: "0",
            transform: "translate(0, 0) scale(0) rotate(0deg)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translate(80px, 0) scale(1.3) rotate(-360deg)",
          },
        },
        "sparkle-burst-center": {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0) rotate(0deg)",
          },
          "30%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(2) rotate(180deg)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(3) rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
