# hapi-rest-methods
Add REST HTTP methods directly to server object of hapi.JS framework to easily add routes.

## Usage
Coming from ExpressJS and trying not to look back into it, I was introduced to HapiJS, which is a nice alternative, but routes definition is an overkill, I simplicity, and so I hooked some handy methods to the hapi server object, so instead of doing:

```
server.route({
  type: 'GET',
  path: '/foo',
  handler: function(request, reply) {
    reply('bar');
  });
});
```

You can just do:

```
server.get('/foo', function(request, reply) {
  reply('bar');
});
```

Simple.

It also supports `post()`, `put()`, `patch()`, `delete()` and `options()`.


## Usage

Simple usage:
```
  // new hapi server
  var hapi = require('hapi');
  var restMethods = require('../')
  var server = new hapi.Server();
  server.connection({ port: 8080 });
  // add hapi-rest-methods plugin
  server.register(restMethods);
  server.get('/fruit', function(request, reply) {
    reply('orange');
  });
  server.post('/grumpy', function(request, reply) {
    console.log(request.payload.name)
    reply('cat');
  });
```

Plays well with other plugins, such as hapi [inert](https://github.com/hapijs/inert):
```
  var inert = require('inert');
  ...
  server.register(restMethods);
  server.register(inert);
  server.get('/', { file: 'public/index.html' });
```

## Issues & Contributing

Use [github issues](https://github.com/daraosn/hapi-rest-methods/issues).

## License

MIT