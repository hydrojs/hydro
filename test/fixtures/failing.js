s('Faling tests', function() {
  t('Async throw', function(done) {
    setTimeout(function() {
      throw new Error('test');
    }, 3);
  });

  t('Sync', function() {
    throw new Error('test');
  });

  t('Async', function(done) {
    process.nextTick(function() {
      done(new Error('test'));
    });
  });

  t('Timeout', function(done) {
    setTimeout(function() {
      done(new Error('Timeout'));
    }, 3);
  });

  t('Throws', function(done) {
    throw new Error('bad');
  });
});

