var readDir = require('./lib/readDir');
var fs = require('fs');
var path = require('path');
var svg2ttf = require('svg2ttf');
var ttf2eot = require('ttf2eot');
var ttf2woff = require('ttf2woff');
var svgicons2svgfont = require('svgicons2svgfont');
var generateCss = require('./lib/generatecss');
var generateHtml = require('./lib/generateHtml');
var config = require('./lib/config');
var writeFile = require('./lib/writeFile');
var TTFStream = require('./lib/svg2ttfstream');

module.exports = function(options) {
  options = options || {};
  var isDeep = options.deep;
  var cdp = options.dir || process.cwd();
  readDir({
    dirpath: cdp,
    callback: function(err, list) {
      if (!list.length) {
        return;
      }
      var targetDir = options.target || config.getTargetDir(cdp);
      var webPath = config.getWebPath(cdp, targetDir);
      var fontName = options.font || config.getFontName();
      var separate = options.separate || '~';
      var cssFilePath = config.getCssPath(cdp);
      var htmlFilePath = config.getHtmlPath(cdp);
      var htmlWebUrl = config.getHtmlWebUrl(cdp);
      var cssWebUrl = config.getCssWebUrl(cdp);
      var mark = config.getMark(cdp);
      var fontFilePath = path.join(targetDir, fontName+'.svg');
      var ttfFilePath = path.join(targetDir, fontName+'.ttf');
      var woffFilePath = path.join(targetDir, fontName+'.woff');
      var eotFilePath = path.join(targetDir, fontName+'.eot');
      writeFile.mkdirs(path.dirname(fontFilePath), function() {
        var svgStream = svgicons2svgfont(list, {
          fontName: fontName,
          normalize: true
        });
        svgStream.pipe(fs.createWriteStream(fontFilePath));
        var ttfStream = svgStream.pipe(new TTFStream({fp: ttfFilePath}));
        ttfStream.on('end', function(data) {
          console.log('ttf created.');
          var ttfcontent = new Uint8Array(data);
          var woffcontent = new Buffer(ttf2woff(ttfcontent).buffer);
          var eotcontent = new Buffer(ttf2eot(ttfcontent).buffer);
          writeFile(woffFilePath , woffcontent, 'utf-8', function() {
            if (!err) {
              console.log('woff created.');
            }
          });
          writeFile(eotFilePath , eotcontent, 'utf-8', function() {
            if (!err) {
              console.log('eot created.');
            }
          });
        });
      });

      fs.readFile(cssFilePath, 'utf-8', function(err, data) {
        var cssText = generateCss(fontName, webPath, list, mark);
        if (err) {
          data = cssText;
        } else {
          var reg = new RegExp('\\/\\*font\\-icon\\-' + (mark?mark+'\\-':'') + 'start\\*\\/[\\s\\S]*\\/\\*font\\-icon\\-' + (mark?mark+'\\-':'') + 'end\\*\\/','i');
          if (!data) {
            data = cssText;
          } else if (reg.test(data)) {
            data = data.replace(reg, cssText);
          } else {
            data = data + '\n' + cssText;
          }
        }
        writeFile(cssFilePath, data, 'utf-8', function(err) {
          console.log('css created.' + cssFilePath);
        });
      });
      writeFile(htmlFilePath, generateHtml(cssWebUrl, list),'utf-8', function(err){
        if (err) {
          console.log(err);
          return ;
        }
        console.log('html created');
        var c = require('child_process');
        c.exec('start ' + htmlWebUrl);
        console.log(htmlWebUrl);
      });
    },
    isDeep: isDeep
  });
};
