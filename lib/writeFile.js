var path = require('path');
var fs = require('fs');
module.exports = function(filepath, content, encoding, callback) {
  var dir = path.dirname(filepath);
  mkdirs(dir, function(){
    fs.writeFile(filepath, content, encoding, callback);
  });
}
var mkdirs = module.exports.mkdirs = function(dirpath, callback) {
  fs.stat(dirpath, function(err, stat) {
    if (stat) {
      callback();
    } else {
      var parent = path.dirname(dirpath);
      fs.mkdir(dirpath, function(err) {
        if (err) {
          mkdirs(parent, function(){
            mkdirs(dirpath,callback);
          });
        } else {
          callback();
        }
      })
    }
  });
};
