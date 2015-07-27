var fs = require('fs');
var path = require('path');
var dirArr = [];
var svglist = [];
var filecount = 1;
var usedCodePoints = [];
var curCodepoint = 0xE001;
var isDeep = false;
function removeObject(arr, obj) {
  var index = arr.indexOf(obj);
  if (~index) {
    arr.splice(index, 1);
  }
}
function getExtName(fp) {
  return fp.replace(/.*[\.\\\/]/gi, '').toLowerCase();
}
function cb(err, filepath, callback) {
  removeObject(dirArr, filepath);
  if (err) {
    callback(err, filepath);
  }
  if (!dirArr.length) {
    var glyphs = svglist.map(function(file) {
      var matches = path.basename(file)
        .match(/^(.+?)(?:(?:~(?:([\s\S])|(?:u([0-9a-f]{4,6})))))?.svg$/i);
      var c = matches[2] && matches[2].charCodeAt(0).toString(16);
      var cp = c || matches[3];
      var glyph = {
        name: matches[1],
        codepoint: 0,
        file: file,
        stream: fs.createReadStream(file)
      };
      if (matches && cp) {
        glyph.codepoint = parseInt(cp, 16);
        usedCodePoints.push(glyph.codepoint);
      }
      return glyph;
    }).map(function(glyph) {
      if(0 === glyph.codepoint) {
        do {
          glyph.codepoint = curCodepoint++;
        } while(~usedCodePoints.indexOf(glyph.codepoint));
        usedCodePoints.push(glyph.codepoint);
      }
      return glyph;
    });
    callback(null, glyphs);
  }
}
function readDir(dirpath, callback) {
  if (!callback && typeof dirpath === 'function') {
    callback = dirpath;
    dirpath = null;
  }
  var cdp = dirpath || process.cwd();
  fs.readdir(cdp, function(err, files){
    if (err) {
      return cb(err, cdp, callback);
    }
    files.forEach(function(o){
      filecount++;
      var fp = path.join(cdp, o);
      dirArr.push(fp);
      fs.stat(fp, function(err, stats) {
        if (err) {
          return cb(err, fp, callback);
        }
        if (stats.isDirectory()) {
          if (isDeep) {
            readDir(fp, callback);
          } else {
            cb(null, fp, callback);
          }
        } else if (stats.isFile()) {
          if (getExtName(fp) === 'svg') {
            svglist.push(fp);
          }
          cb(null, fp, callback);
        }
      });
    });
    cb(null, cdp, callback);
  });
}
module.exports = function (options) {
  var callback = typeof options.callback === 'function' ? options.callback : function(){};
  if ( typeof options === 'function') {
    callback = options;
  }
  var cdp = options.dirpath || process.cwd();
  isDeep = !!options.isDeep;
  readDir(cdp, callback);
};
