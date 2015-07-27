var config = require('../lib/config');
var should = require('should');
describe('config.getMark', function () {
  it('/mnt/d/work/fe/dev/c/h5/trunk/v1/css return ch5', function () {
    config.getMark('/mnt/d/work/fe/dev/c/h5/trunk/v1/css').should.be.eql('ch5');
  });
  it('/mnt/d/work/fe/core/h5/trunk/v1/css return coreh5', function () {
    config.getMark('/mnt/d/work/fe/core/h5/trunk/v1/css').should.be.equal('coreh5');
  });
  it('/mnt/d/work/xxxx/core/ccch5/trunk/v1/css return ""', function () {
    config.getMark('/mnt/d/work/xxxx/core/ccch5/trunk/v1/css').should.be.empty;
  });
});

describe('config.getTargetDir', function(){
  it('/mnt/d/work/fe/dev/c/h5/trunk/v1/css  reutrn /mnt/d/work/fe/dev/c/h5/trunk/v1/font', function() {
    config.getTargetDir('/mnt/d/work/fe/dev/c/h5/trunk/v1/css').should.be.equal('/mnt/d/work/fe/dev/c/h5/trunk/v1/font/');
  });
  it('/mnt/d/work/fe/core/h5/trunk/v1/css  reutrn /mnt/d/work/fe/core/h5/trunk/v1/font', function() {
    config.getTargetDir('/mnt/d/work/fe/core/h5/trunk/v1/css').should.be.equal('/mnt/d/work/fe/core/h5/trunk/v1/font/');
  });
  it('/mnt/d/work/fe/core/h5/trunk/v2/css  reutrn /mnt/d/work/fe/core/h5/trunk/v2/font', function() {
    config.getTargetDir('/mnt/d/work/fe/core/h5/trunk/v2/css').should.be.equal('/mnt/d/work/fe/core/h5/trunk/v2/font/');
  });
  it('/mnt/d/work/fe/core/h5/trunk  reutrn /mnt/d/work/fe/core/h5/trunk/custom-font/', function() {
    config.getTargetDir('/mnt/d/work/fe/core/h5/trunk').should.be.equal('/mnt/d/work/fe/core/h5/trunk/custom-font/');
  });

  it('/mnt/d/  reutrn /mnt/d/custom-font/', function() {
    config.getTargetDir('/mnt/d/').should.be.equal('/mnt/d/custom-font/');
  });
});
describe('config.getWebPath', function() {
  it('/mnt/d/work/fe/dev/c/h5/trunk/v1/css', function() {
    config.getWebPath('/mnt/d/work/fe/dev/c/h5/trunk/v1/css',  '').should.be.equal('http://c.h5.lietou-static.com/v1/font/');
  });
  it('/mnt/d/work/fe/core/h5/trunk/v1/css', function() {
    config.getWebPath('/mnt/d/work/fe/core/h5/trunk/v1/css',  '').should.be.equal('http://core.h5.lietou-static.com/v1/font/');
  });
  it('/mnt/d/work/', function() {
    config.getWebPath('/mnt/d/work/',  '/').should.be.equal('../../../../');
  });
  it('/mnt/d/work/', function() {
    config.getWebPath('/mnt/d/work/',  '/mnt/d/work/pages').should.be.equal('file:////');
  });
});
