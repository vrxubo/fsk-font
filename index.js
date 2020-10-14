const R = require('ramda');
const fs = require('fs');
const path = require('path');
const ttf2eot = require('ttf2eot');
const ttf2woff = require('ttf2woff');
const svgicons2svgfont = require('svgicons2svgfont');

const glyphs = require('./lib/readFile');
const generateCss = require('./lib/generatecss');
const writeFile = require('./lib/writeFile');
const TTFStream = require('./lib/svg2ttfstream');

const fontPath = (dir, fontName) => ext => path.join(dir, `${fontName}.${ext}`);

const cssFile = R.curry((cssFilePath, list) => {
  list && list.length && fs.readFile(cssFilePath, 'utf-8', function (err, data) {
    let cssText = generateCss(list);
    const reg = /\/\*font-icon-start\*\/[\s\S]*\/\*font-icon-end\*\//i;
    if (reg.test(data)) {
      cssText = data.replace(reg, cssText);
    } else if (data) {
      cssText = `${data}\n${cssText}`;
    }
    writeFile(cssFilePath, cssText, 'utf-8', function (err) {
      console.log(`css created.${cssFilePath}`);
    });
  });
});
const mapping = R.reduce((map, { name, codepoint }) => {
  map[name] = codepoint.toString(16);
  return map;
}, {});
const svgFontStream = fontName => list => list && list.length && svgicons2svgfont(list, { fontName, normalize: true });
const generateTTFFont = ttfFilePath => svgStream => svgStream.pipe(new TTFStream({ fp: ttfFilePath }));
const generateSVGFont = fontFilePath => svgStream => svgStream.pipe(fs.createWriteStream(fontFilePath));
const woffBuffer = ttfContent => new Buffer(ttf2woff(ttfContent).buffer);
const eotBuffer = ttfContent => new Buffer(ttf2eot(ttfContent).buffer);
const logger = msg => err => (err ? console.error(err) : console.log(msg));
const writeFontFile = R.curry((filePath, fileContent) => writeFile(filePath, fileContent, 'utf8', logger(`${filePath} Done.`)));
const ttfComplete = callback => ttfStream => ttfStream.on('end', data => callback(new Uint8Array(data)));
const creatDir = R.curry((dir, callback) => writeFile.mkdirs(dir, callback));
module.exports = function ({ dir, target, font, css } = {}) {
  const cdp = dir || process.cwd();
  const targetDir = target || path.resolve(cdp, '../');
  const fontName = font || 'h5icon';
  const cssFilePath = path.resolve(targetDir, css || 'font.css');
  const filePath = fontPath(targetDir, fontName);
  const writeCssFile = cssFile(cssFilePath);
  const mappingFile = writeFontFile(path.resolve(cdp, 'mapping.json'));
  const writeMappingFile = R.compose(mappingFile, JSON.stringify, mapping);
  const generateWOFFFont = R.compose(writeFontFile(filePath('woff')), woffBuffer);
  const generateEOTFont = R.compose(writeFontFile(filePath('eot')), eotBuffer);
  const createFontFile = R.converge(ttfComplete(ttf => {
    generateWOFFFont(ttf);
    generateEOTFont(ttf);
  }), [generateTTFFont(filePath('ttf')), generateSVGFont(filePath('svg'))]);
  const createFont = R.converge(
    createFontFile,
    [
      svgFontStream(fontName),
      writeCssFile,
      writeMappingFile
    ]
  );
  const svg2font = R.compose(createFont, glyphs);
  creatDir(targetDir, () => svg2font(cdp));
};
