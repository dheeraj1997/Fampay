// /index.js
'use strict';

var server = require('./config/initializers/server');
var nconf = require('nconf');
var async = require('async');
var logger = require('winston');

// Load Environment variables from .env file
require('dotenv').config();



// Set up configs
nconf.use('memory');
// First load command line arguments
nconf.argv();
// Load environment variables
nconf.env();
// Load config file for the environment
require('./config/environments/' + nconf.get('NODE_ENV') || 'development');
logger.info("[DATABASE] " + nconf.get('database'));
logger.info('[APP] Starting server initialization');

// Initialize Modules
async.series([
	function startServer(callback) {
		server(callback);
	}
], function(err) {
	if (err) {
		logger.error('[APP] initialization failed', err);
	} else {
		logger.info('[APP] initialized SUCCESSFULLY');
	}
});