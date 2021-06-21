const dbURL = nconf.get('database');

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

const dbConnection = mongoose.createConnection(dbURL, dbOptions)

dbConnection.on('connected', () => {
  console.log('Connected to MongoDB successfully.')
})

dbConnection.on('error', error => {
  console.log(`MongoDB connection couldn't be established. ${JSON.stringify(error)}`)
  Sentry.captureException(error)
})

export default dbConnection
