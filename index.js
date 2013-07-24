// Copyright (C) 2013 Jan Krems
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var ProcessResource = require('./resource/process');
var Url = require('url');
var QueryString = require('querystring');

function parsedUrl(url) {
  var parsed = Url.parse(url);
  parsed.query = QueryString.parse(parsed.query);
  parsed.segments = parsed.pathname.substr(1).split('/').filter(
    function(segment) {
      return segment.length > 0; 
    });
  return parsed;
}

/**
 * Bugger daemon - bringing buggers together since 2013
 */
var buggerd = module.exports = function() {
  var handleProcessRequest = ProcessResource();

  return function(req, res) {
    req.parsedUrl = parsedUrl(req.url);
    switch (req.parsedUrl.segments.shift()) {
      case 'processes':
        return handleProcessRequest(req, res);
      default:
        return res.end(req.url);
    }
  };
};

/**
 * Create an http server that just runs buggerd
 */
buggerd.createServer = function() {
  return require('http').createServer(buggerd());
};
