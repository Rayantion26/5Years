/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#00ffff',
                'electric-purple': '#bf00ff',
            },
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
                display: ['"Outfit"', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-depth': 'linear-gradient(to bottom right, #000000, #0a0a0a, #111111)',
            }
        },
    },
    plugins: [],
}
