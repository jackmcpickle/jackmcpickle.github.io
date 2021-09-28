const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssPresetEnv = require('postcss-preset-env');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = (ctx) => {
  const plugins = [
    postcssPresetEnv,
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
