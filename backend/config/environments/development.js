var nconf = require('nconf');
nconf.set('NODE_PORT', '4095');
nconf.set('url', 'http://localhost');
nconf.set('secret', '#mysecret123');
nconf.set('database', `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`);