const Hapi=require('hapi');
const Path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: 'localhost'
    
  });
  
  await server.register(require('inert'));

  server.route({  
  method: 'GET',
  path: '/{file*}',
  handler: {
    directory: { 
      path: 'public'
    }
  	} 
 })

  await server.register(require('vision'));
  server.views({
    engines: {
        html: require('handlebars')
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'default',
    partialsPath: 'views/partials'
    //helpersPath: 'views/helpers',
  });

  // create your routes
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.view('index');
    }
  });

  server.route({
    method: 'GET',
    path: '/about',
    handler: (request, h) => {
      return h.view('about');
    }
  });

  server.route({
    method: 'GET',
    path: '/samplePost',
    handler: (request, h) => {
      return h.view('samplePost');
    }
  });

  server.route({
    method: 'GET',
    path: '/contact',
    handler: (request, h) => {
      return h.view('contact');
    }
  });
  

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();