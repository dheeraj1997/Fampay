var nconf = require('nconf');
nconf.set('NODE_PORT', '80');
nconf.set('url', 'http://localhost');
nconf.set('secret', '#mysecret12345');
nconf.set('database', 'mongodb://localhost/fampay');