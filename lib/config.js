var absreg = /(.*)(core|dev)([\/\\])([a-z]+)?[\/\\]?(pc|h5)[\/\\](trunk|branches[\/\\][^\/\\]+)([\/\\][^\s]+)/i;
var fontName = 'h5icon';
exports.getTargetDir = function(cdp) {
  return cdp.replace(absreg, function() {
    if (arguments.length > 7) {
      return arguments[1] + arguments[2] + arguments[3] + (arguments[4] ? arguments[4]+arguments[3] : '') + arguments[5] + arguments[3] + arguments[6] + '/v1/font/';
    }
    return cdp;
  });
};
exports.getWebPath = function(cdp) {
  return cdp.replace(absreg, function() {
    if (arguments.length) {
      var port = arguments[4] || arguments[2];
      var hj = arguments[5];
      return 'http://' + port + '.' + hj + '.lietou-static.com/v1/font/';
    }
    return 'http://c.h5.lietou-static.com/v1/font/';
  });
}
exports.getFontName = function() {
  return fontName;
}
exports.getCssPath = function(cdp) {
  return cdp.replace(absreg, function() {
    if (arguments.length > 7) {
      return arguments[1] + arguments[2] + arguments[3] + (arguments[4] ? arguments[4]+arguments[3] : '') + arguments[5] + arguments[3] + arguments[6] + '/v1/css/base.css';
    }
    return cdp;
  });
}
exports.getHtmlPath = function(cdp) {
  return cdp.replace(absreg, function() {
    if (arguments.length > 7) {
      return arguments[1] + arguments[2] + arguments[3] + (arguments[4] ? arguments[4]+arguments[3] : '') + arguments[5] + '/pages/font.html';
    }
    return cdp;
  });
}
exports.getHtmlWebUrl = function(cdp) {
  return cdp.replace(absreg, function() {
    if (arguments.length) {
      var port = arguments[4] || arguments[2];
      var hj = arguments[5];
      return 'http://' + port + '.' + hj + '.pages.com/font.html';
    }
    return exports.getHtmlPath(cdp);
  });
}
exports.getCssWebUrl = function(cdp) {
  return cdp.replace(absreg, function() {
    if (arguments.length) {
      var port = arguments[4] || arguments[2];
      var hj = arguments[5];
      return 'http://' + port + '.' + hj + '.lietou-static.com/v1/css/base.css';
    }
    return 'http://c.h5.lietou-static.com/v1/css/base.css';
  });
}
