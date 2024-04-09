import { Config } from 'tailwindcss';

export default {
    content: ['public/index.html', 'assets/css/*.css'],
    theme: {
        extend: {},
        screens: {
            sm: '600px',
            md: '900px',
            lg: '1280px',
            xl: '1680px',
        },
    },
    variants: {
        appearance: ['responsive'],
        fill: [],
    },
    corePlugins: {
        float: false,
        container: false,
    },
} satisfies Config;
