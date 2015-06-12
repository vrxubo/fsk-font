#!/usr/bin/env node
var fs = require('fs');
var ArgumentParser = require('argparse').ArgumentParser;
var ai2font = require('../');
var argsParser = new ArgumentParser({
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
argsParser.addArgument(['-D', '--deep'], {
  help: '是否扫描-d指定目录的子目录,默认不扫描',
  action: 'storeTrue'
});
argsParser.addArgument(['-f', '--font'], {
  help: '指定字体名称'
});
argsParser.addArgument(['-s', '--separate'], {
  help: '指定svg文件名的分隔符,默认为~, 暂不支持此参数'
});
var args = argsParser.parseArgs();
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
