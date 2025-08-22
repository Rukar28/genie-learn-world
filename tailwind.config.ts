import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))'
				},
				reward: {
					DEFAULT: 'hsl(var(--reward))',
					foreground: 'hsl(var(--reward-foreground))',
					glow: 'hsl(var(--reward-glow))'
				},
				magic: {
					DEFAULT: 'hsl(var(--magic))',
					foreground: 'hsl(var(--magic-foreground))',
					glow: 'hsl(var(--magic-glow))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					border: 'hsl(var(--card-border))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-reward': 'var(--gradient-reward)',
				'gradient-magic': 'var(--gradient-magic)',
				'gradient-panel': 'var(--gradient-panel)'
			},
			boxShadow: {
				'glow-cyan': 'var(--shadow-glow-cyan)',
				'glow-emerald': 'var(--shadow-glow-emerald)',
				'glow-reward': 'var(--shadow-glow-reward)',
				'glow-magic': 'var(--shadow-glow-magic)',
				'panel': 'var(--shadow-panel)'
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'bounce-pulse': 'bouncePulse 2s infinite',
				'shimmer': 'shimmer 2s infinite',
				'fade-slide': 'fadeSlide 0.5s ease-out',
				'scale-pop': 'scalePop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'confetti-burst': 'confettiBurst 0.6s ease-out'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(5px) rotate(-1deg)' }
				},
				bouncePulse: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				shimmer: {
					'0%': { left: '-100%' },
					'100%': { left: '100%' }
				},
				fadeSlide: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				scalePop: {
					'0%': { transform: 'scale(0.8)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				confettiBurst: {
					'0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
					'100%': { transform: 'scale(1.2) rotate(360deg)', opacity: '0' }
				}
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
