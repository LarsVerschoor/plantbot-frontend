/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            spacing: {
                'ch-1': '1ch',
                'page': '72rem'
            }
        }
    },
    plugins: [],
}

