describe("hapi-rest-methods", function() {
  var hapi = require('hapi');
  var restMethods = require('../')
  var server = new hapi.Server();
  server.connection({ port: 8080 });
  server.register(restMethods);

  ['get', 'post', 'put', 'patch', 'delete', 'options'].forEach(function(methodName) {
    it("should decorate hapi.server and make it respond to ." + methodName + "()", function() {
      expect(typeof server[methodName]).toBe("function");
    });
  });
});