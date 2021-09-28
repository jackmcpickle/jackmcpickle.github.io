const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const postcssImport = require('postcss-import');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = (ctx) => {
  const plugins = [
    postcssPresetEnv,
    postcssImport({
      path: ['node_modules', 'assets/css'],
    }),
    tailwindcss,
    autoprefixer
  ];

  if (prodMode) {
    plugins.push(
        cssnano,
    );
  }

  return {
      plugins
  };
};
