var nconf = require('nconf');
nconf.set('NODE_PORT', '80');
nconf.set('url', 'http://localhost');
nconf.set('secret', '#mysecret12345');
nconf.set('database', `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`);