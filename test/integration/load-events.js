var fixtures = require('path').join(__dirname, '..', 'support', 'fixtures');

s('load events', function() {
  t('post and pre events when loading tests', function() {
    var hydro = new Hydro;
    var file = null;
    var exportz = null;
    var test = fixtures + '/exports.js';

    hydro.on('pre:file', function(f) {
      file = f;
    });

    hydro.on('post:file', function(_, content) {
      exportz = content;
    });

    hydro.run({ tests: [test] }, function() {
      file.should.eq(test);
      exportz.should.eql({
        foo: 'bar'
      });
    });
  });
});
