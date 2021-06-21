global.express = require('express');
global.config = require('nconf');
global.logger = require('winston');
// global.Utils = require('../../utils');
global.validator = require('express-validator');
global.messages = require('../helpers/messages');

var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var RateLimit = require('express-rate-limit');
global.request = require('request');


var app;

var start = function(cb) {
   'use strict';
   app = express();
   app.use(morgan('common'));
   app.use(bodyParser.urlencoded({
      extended: true
   }));
   app.use(bodyParser.json({
      type: '*/*'
   }));
   app.use(validator());
   logger.info('[SERVER] Initializing routes');


   app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
      next();
   });
   /*
   // max number of requests from one ip in windowMs second
   var apiLimiter = new RateLimit({
      windowMs: 1000, // 15 minutes
      max: 5,
      delayAfter: 500,
      delayMs: 500,
      handler: function(req, res, next) {
         next({
            status: 429,
            message: 'You are making calls too frequently.'
         })

      }
   });
   //Uncomment the below line to enable rate limiter for your api
   //app.use('/api/', apiLimiter);
	 */
   require('../../app/routes/index')(app);


   // app.use('/public', express.static(path.join(__dirname, '../../public')));

   // Error handler
   app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
         message: err.message,
         error: (app.get('env') === 'development' ? err : true)
      });
      next(err);
   });

   app.listen(process.env.NODE_PORT);
   logger.info('[SERVER] Live at ' + `http://${process.env.HOST}:${process.env.NODE_PORT}`);

   if (cb) {
      return cb();
   }
};

module.exports = start;