module.exports = function(fontName, fontPath, glyphs, port) {
  var cssText = '/*font-icon-' + (port?port + '-':'') + 'start*/\n';
  // cssText += '@font-face {\n';
  // cssText += '  font-family: "' + fontName + '";\n';
  // cssText += '  src: url(' + fontPath + fontName + '.eot);\n';
  // cssText += '  src: url(' + fontPath + fontName + '.eot?#iefix) format("eot"),\n';
  // cssText += '    url(' + fontPath + fontName + '.woff) format("woff"),\n';
  // cssText += '    url(' + fontPath + fontName + '.ttf) format("truetype"),\n';
  // cssText += '    url(' + fontPath + fontName + '.svg#' + fontName + ') format("svg");\n';
  // cssText += '}\n';
  // cssText += '\n';
  // cssText += '.icon:before {\n';
  // cssText += '  font-family: "' + fontName + '";\n';
  // cssText += '  -webkit-font-smoothing: antialiased;\n';
  // cssText += '  -moz-osx-font-smoothing: grayscale;\n';
  // cssText += '  font-style: normal;\n';
  // cssText += '  font-variant: normal;\n';
  // cssText += '  font-weight: normal;\n';
  // cssText += '  text-decoration: none;\n';
  // cssText += '  text-transform: none;\n';
  // cssText += '}\n';
  glyphs.forEach(function(glyph) {
    cssText += '.icon-' + glyph.name + ':before {\n' ;
    cssText += '  content: "\\' + glyph.codepoint.toString(16) + '";\n' ;
    cssText += '}\n';
  });
  cssText += '/*font-icon-' + (port?port + '-':'') + 'end*/';
  return cssText;
};

