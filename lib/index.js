'use strict';

function decorateServerMethod(server, methodName) {
  server.decorate('server', methodName, function(path, options, handler) {
    if(typeof options == "function") {
      handler = options;
      options = { handler: handler };
    } else {
      options.handler = handler;
    }
    options.path = path;
    options.method = methodName;
    if (options.method === 'any') options.method = '*';
    server.route(options);
  });
}

exports.register = function(server, options, next) {
  ['any', 'get', 'post', 'put', 'patch', 'delete', 'options'].forEach(function(methodName) {
    decorateServerMethod(server, methodName);
  });

  return next();
};

exports.register.attributes = {
  pkg: require('../package.json'),
  connections: true,
  once: true
};