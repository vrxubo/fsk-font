const R = require('ramda');

const iconCss = ({ name, codepoint }) => `.icon-${name}:before {content: "\\${codepoint.toString(16)}";}`;
const css = glyphs => R.map(iconCss, glyphs).join('');
module.exports = function (glyphs) {
  return `/*font-icon-start*/${css(glyphs)}/*font-icon-end*/`;
};

