var nconf = require('nconf');
nconf.set('NODE_PORT', '4095');
nconf.set('url', 'http://localhost');
nconf.set('secret', '#mysecret123');
nconf.set('database', 'mongodb://localhost/fampay');