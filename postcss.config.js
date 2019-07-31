const purgecss = require('@fullhuman/postcss-purgecss')({
    // Specify the paths to all of the template files in your project
    content: [
        './public/**/*.html',
        './public/**/*.vue',
        './public/**/*.jsx',
        // etc.
    ],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss'),
        ,
        ...(process.env.NODE_ENV === 'production'
            ? [require('postcss-preset-env'), require('autoprefixer'), require('cssnano'), purgecss]
            : []),
    ],
};
