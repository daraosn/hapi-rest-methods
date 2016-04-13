describe("hapi-rest-methods", function() {

  var testMethods = ['any', 'get', 'post', 'put', 'patch', 'delete', 'options'];

  var hapi = require('hapi');
  var request = require('request');
  var restMethods = require('../lib/index')

  var server;

  beforeEach(function() {
    server = new hapi.Server();
    server.connection({ port: 8080 });
    server.register(restMethods);
  });

  afterEach(function() {
    server.stop();
    server = null;
  });

  function it_for(specName, methodName, callback) {
    it(specName + " for " + methodName + "()", callback);
  }

  describe("when configuring server", function() {

    testMethods.forEach(function(methodName) {

      it_for("should decorate hapi.server and make it respond", methodName, function() {
        expect(typeof server[methodName]).toBe("function");
      });

    });

  });

  describe("when running server", function() {

    function testServer(methodName, path) {
      server.start(function(err) {
        if(err) throw err;
        if(methodName === 'any') methodName = 'patch'; // this can be anything, choosing patch for convenience
        request({ uri: server.info.uri + path, method: methodName }, function(error, response, body) {
          expect(response.statusCode).toBe(200);
          expect(body).toBe('test');
        });
      });
    }

    function routeHandler(done) {
      return function(response, reply) {
        reply('test');
        done();
      }
    }

    testMethods.forEach(function(methodName) {

      it_for("should create route path and handler", methodName, function(done) {
        var path = '/test/' + methodName;
        server[methodName](path, routeHandler(done));
        testServer(methodName, path);
      });

      it_for("should create route path, config and handler", methodName, function(done) {
        var path = '/test/' + methodName;
        server[methodName](path, {}, routeHandler(done));
        testServer(methodName, path);
      });

    });

  });


});