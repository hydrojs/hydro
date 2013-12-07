/**
 * Core dependencies.
 */

var domain = require('domain');

/**
 * Internal dependencies.
 */

var BaseTest = require('./base');

/**
 * Async test.
 *
 * @constructor
 */

var AsyncTest = BaseTest.extend();

/**
 * Execute the test.
 *
 * @param {Object} events
 * @param {Function} done
 * @api private
 */

AsyncTest.prototype.exec = function(events, done) {
  var timeout = null;
  var ended = false;
  var operation = domain.create();
  var fn = this.fn;

  function end(err) {
    if (ended) return;
    ended = true;
    clearTimeout(timeout);
    done(err);
  }

  operation.on('error', end);

  timeout = setTimeout(function() {
    end(new Error('Test timed out'));
  }, 1000 * 60);

  operation.run(function() {
    fn(end);
  });
};

/**
 * Primary export.
 */

module.exports = AsyncTest;