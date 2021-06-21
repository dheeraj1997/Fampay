const mongoose = require('mongoose');
const dbURL = config.get('database');

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const dbConnection = mongoose.createConnection(dbURL, dbOptions)

dbConnection.on('connected', () => {
  logger.info('Connected to MongoDB successfully.')
})

dbConnection.on('error', error => {
  logger.error(`MongoDB connection couldn't be established. ${JSON.stringify(error)}`)
})

module.exports = dbConnection;
