#!/usr/bin/env node

var createBuggerServer = require('../lib/bugger-daemon.js');
createBuggerServer()
.listen(8058, '127.0.0.1', function() {
  var address = this.address();
  console.log('bugger-daemon listening:', address);
  console.log('Press Ctrl+C to quit.');
});
