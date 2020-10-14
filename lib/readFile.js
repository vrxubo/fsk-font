const glob = require('glob');
const fs = require('fs');
const { resolve, basename } = require('path');
const R = require('ramda');

const START_CODE_POINT = 0xE000;

const mappingFile = dir => resolve(dir, 'mapping.json');
const readJson = fp => (fs.existsSync(fp) ? require(fp) : {});
const mappingJson = R.compose(readJson, mappingFile);
const svgs = dir => glob.sync(resolve(dir, '**/*.svg'));

const parseNameFunc = (mapping) => {
  let maxCodepoint = Math.max(...Object.keys(mapping).map(k => parseInt(R.prop(k, mapping), 16)), START_CODE_POINT) + 1;
  return file => {
    const fileName = basename(file);
    const [, name, c, u] = fileName.match(/^(.+?)(?:(?:~(?:([\s\S])|(?:u([0-9a-f]{4,6})))))?.svg$/i) || [];
    const cp = mapping[name] || (c && c.charCodeAt(0).toString(16)) || u;
    return {
      name,
      file,
      codepoint: cp ? parseInt(cp, 16) : maxCodepoint++,
      stream: fs.createReadStream(file),
    };
  };
};

const glyph = R.compose(parseNameFunc, mappingJson);
module.exports = R.converge(R.map, [glyph, svgs]);
