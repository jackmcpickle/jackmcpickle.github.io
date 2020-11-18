const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
        'public/index.html',
        'assets/css/*.css',
    ],
    safelist: [],

    // This is the function used to extract class names from your templates
    defaultExtractor: content => {
      // Capture as liberally as possible, including things like `h-(screen-1.5)`
      const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

      // Capture classes within other delimiters like .block(class="w-1/2") in Pug
      const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

      return broadMatches.concat(innerMatches)
    }
});

const prodMode = process.env.NODE_ENV === 'production';

module.exports = (ctx) => {
  const plugins = [
    postcssPresetEnv,
    postcssImport({
      path: ['node_modules', 'public/app/themes/brd/assets/css'],
    }),
    tailwindcss,
    autoprefixer
  ];

  if (prodMode) {
    plugins.push(
        cssnano,
        purgecss,
    );
  }

  return {
      plugins
  };
};
