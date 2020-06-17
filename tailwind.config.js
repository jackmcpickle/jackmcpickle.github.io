const { colors , backgroundColor } = require('tailwindcss/defaultConfig');

module.exports = {
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
  purge: [
    './public/**/*.html'
  ],
};
