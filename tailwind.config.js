import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"Roboto Condensed"', ...defaultTheme.fontFamily.sans],
                yellowtail: ['"Yellowtail"', 'cursive'],
                funnel: ['"Funnel Display"', 'sans-serif'],
            },
            colors: {
                primary: "#1D9596",
                priDark: "#0A4B51",
                secDark: "#1d9596",
                secondary: "#67C761",
                bodyBack: "#EEEEFF",
                silver: "#DBDFE0"
            }
        },
    },

    plugins: [forms],
};
