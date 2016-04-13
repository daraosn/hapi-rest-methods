'use strict';

function decorateServerMethod(server, methodName) {
  server.decorate('server', methodName, function(path, handler) {
    server.route({
      method: methodName,
      path: path,
      handler: handler
    });
  });
}

exports.register = function(server, options, next) {
  ['get', 'post', 'put', 'patch', 'delete', 'options'].forEach(function(methodName) {
    decorateServerMethod(server, methodName);
  });

  return next();
};

exports.register.attributes = {
  pkg: require('../package.json'),
  connections: true,
  once: true
};