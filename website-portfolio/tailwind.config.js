/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				button: 'var(--button-color)',
				neutral: 'var(--neutral-color)',
				extraLight: 'var(--extra-light)',
				lighter: 'var(--lighter)',
				textColor: 'var(--text-color)',
			},
		},
	},
	plugins: [],
};
