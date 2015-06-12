var absreg = /(.*)(core|dev)([\/\\])([a-z]+)?[\/\\]?(pc|h5)[\/\\](trunk|branches[\/\\][^\/\\]+)([\/\\][^\s]+)/i;
var fontName = 'h5icon';
var path = require('path');
exports.getTargetDir = function(cdp) {
  if (absreg.test(cdp)) {
    return cdp.replace(absreg, function() {
      if (arguments.length > 7) {
        return arguments[1] + arguments[2] + arguments[3] + (arguments[4] ? arguments[4]+arguments[3] : '') + arguments[5] + arguments[3] + arguments[6] + '/v1/font/';
      }
      return cdp + '/custom-font/';
    });
  }
  return cdp + '/custom-font/';
};
exports.getWebPath = function(cdp, target) {
  if (absreg.test(cdp)) {
    return cdp.replace(absreg, function() {
      if (arguments.length) {
        var port = arguments[4] || arguments[2];
        var hj = arguments[5];
        return 'http://' + port + '.' + hj + '.lietou-static.com/v1/font/';
      }
      var d = path.relative(path.dirname(exports.getHtmlPath(cdp)), target) + '/';
      return (path.isAbsolute(d) ? 'file:///' + d : d).replace(/\\/g, '/');
    });
  }
  var d = path.relative(path.dirname(exports.getHtmlPath(cdp)), target) + '/';
  return (path.isAbsolute(d) ? 'file:///' + d : d).replace(/\\/g, '/');
}
exports.getFontName = function() {
  return fontName;
}
exports.getCssPath = function(cdp) {
  if (absreg.test(cdp)) {
    return cdp.replace(absreg, function() {
      if (arguments.length > 7) {
        return (arguments[1] + arguments[2] + arguments[3] + (arguments[4] ? arguments[4]+arguments[3] : '') + arguments[5] + arguments[3] + arguments[6] + '/v1/css/base.css').replace(/\\/g, '/');;
      }
      return (cdp + '/pages/base.css').replace(/\\/g, '/');;
    });
  }
  return (cdp + '/pages/base.css').replace(/\\/g, '/');;
}
exports.getHtmlPath = function(cdp) {
  if (absreg.test(cdp)) {
    return cdp.replace(absreg, function() {
      if (arguments.length > 7) {
        return (arguments[1] + arguments[2] + arguments[3] + (arguments[4] ? arguments[4]+arguments[3] : '') + arguments[5] + '/pages/font.html').replace(/\\/g, '/');;
      }
      return (cdp + '/pages/font.html').replace(/\\/g, '/');;
    });
  }
  return (cdp + '/pages/font.html').replace(/\\/g, '/');;
}
exports.getHtmlWebUrl = function(cdp) {
  if (absreg.test(cdp)) {
    return cdp.replace(absreg, function() {
      if (arguments.length) {
        var port = arguments[4] || arguments[2];
        var hj = arguments[5];
        return 'http://' + port + '.' + hj + '.pages.com/font.html';
      }
      return exports.getHtmlPath(cdp).replace(/\\/g, '/');;
    });
  }
  return exports.getHtmlPath(cdp).replace(/\\/g, '/');;
}
exports.getCssWebUrl = function(cdp) {
  if (absreg.test(cdp)) {
    return cdp.replace(absreg, function() {
      if (arguments.length) {
        var port = arguments[4] || arguments[2];
        var hj = arguments[5];
        return 'http://' + port + '.' + hj + '.lietou-static.com/v1/css/base.css';
      }
      return 'base.css';
    });
  }
  return 'base.css';
}
