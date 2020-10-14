#!/usr/bin/env node
const fs = require('fs');
const ArgumentParser = require('argparse').ArgumentParser;
const ai2font = require('../');
const argsParser = new ArgumentParser({
  version: require('../package.json').version,
  addHelp: true,
  description: 'SVG to font converter'
});
argsParser.addArgument(['-d', '--dir'], {
  help: 'svg文件所在目录'
});
argsParser.addArgument(['-t', '--target'], {
  help: '字体文件存放目录;最好不要和svg文件是同一个目录,或者是svg文件所在目录的子目录.'
});
argsParser.addArgument(['-f', '--font'], {
  help: '指定字体名称'
});
argsParser.addArgument(['-c', '--css'], {
  help: '设置css文件存放目录, svgs目录的相对目录'
});
const args = argsParser.parseArgs();
if (args.dir) {
  fs.stat(args.dir, function(err, stat) {
    if (err) {
      console.dir(err);
    } else {
      if (stat.isDirectory()) {
        ai2font(args);
      } else {
        console.log('无效的目录');
      }
    }
  });
} else {
  ai2font(args);
}

