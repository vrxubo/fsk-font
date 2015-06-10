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
      var webPath = config.getWebPath(cdp);
      var targetDir = options.target || config.getTargetDir(cdp);
      var fontName = options.font || config.getFontName();
      var separate = options.separate || '~';
      var cssFilePath = config.getCssPath(cdp);
      var htmlFilePath = config.getHtmlPath(cdp);
      var htmlWebUrl = config.getHtmlWebUrl(cdp);
      var cssWebUrl = config.getCssWebUrl(cdp);
      var fontFilePath = path.join(targetDir, fontName+'.svg');
      var ttfFilePath = path.join(targetDir, fontName+'.ttf');
      var woffFilePath = path.join(targetDir, fontName+'.woff');
      var eotFilePath = path.join(targetDir, fontName+'.eot');
      writeFile.mkdirs(path.dirname(fontFilePath), function() {
        svgicons2svgfont(list, {
          fontName: fontName
        }).pipe(fs.createWriteStream(fontFilePath)).on('finish',function() {
          fs.readFile(fontFilePath, 'utf-8',function(err, data) {
            var ttfcontent = new Buffer(svg2ttf(data, {}).buffer);
            writeFile(ttfFilePath, ttfcontent, 'utf-8', function(err) {
              if (!err) {
                console.log('ttf created.');
              } else {
                console.log(err)
              }
            });
            var ttfcontent2 = new Uint8Array(ttfcontent);
            var woffcontent = new Buffer(ttf2woff(ttfcontent2).buffer);
            var eotcontent = new Buffer(ttf2eot(ttfcontent2).buffer);
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
      });

      fs.readFile(cssFilePath, 'utf-8', function(err, data) {
        var cssText = generateCss(fontName, webPath, list);
        if (err) {
          data = cssText;
        } else {
          var reg = /\/\*font\-icon\-start\*\/[\s\S]*\/\*font\-icon\-end\*\//i;
          if (!data) {
            data = cssText;
          } else if (reg.test(data)) {
            data = data.replace(reg, cssText);
          } else {
            data = data + '\n' + cssText;
          }
        }
        writeFile(cssFilePath, data, 'utf-8', function(err) {
          console.log('css created.');
        });
      });
      writeFile(htmlFilePath, generateHtml(cssWebUrl, list),'utf-8', function(err){
        if (err) {
          console.log(err);
          return ;
        }
        console.log('html created');
        var c = require('child_process')
        c.exec('start ' + htmlWebUrl);
        console.log(htmlWebUrl);
      });
    },
    isDeep: isDeep
  });
};
