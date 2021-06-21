const googleapis = require('googleapis')
const dbConnection = require('../config/initializers/database')
const constants = require('../app/constants')
const responseParser = require('../app/utils/responseParser')
const videoSchema = require('../app/models/videoSchema')
const VideoModel = dbConnection.model('videos', videoSchema)

// For multiple Google API keys, please specify as a single string separated by ` | `
const authKeys = process.env.GOOGLE_API_KEY.split('|')
let gapi = new googleapis.youtube_v3.Youtube({
    auth: authKeys.shift().trim() // Pop and take the first element in an array, when exhausted shift to next, and so on
})

// We fetch results only after 2020-01-01 to avoid old results
const params = {
    part: ['snippet'],
    maxResults: 50,
    order: 'date',
    type: ['video'],
    publishedAfter: '2020-01-01T00:00:00Z',
    q: process.env.YT_SEARCH_QUERY
}

module.exports.refreshData = () => {
    console.log('Fetching videos data!')

    gapi.search.list(params)
        .then(response => {
            const results = responseParser.parseApiResponse(JSON.parse(JSON.stringify(response.data)))
            // Dump data retrieved from Google API to MongoDB
            VideoModel.insertMany(results, { ordered: false }).then(_response => {
            console.log('Fetched successfully!')
            })
            .catch(err => {
                console.log(`Failed to fetch new data! Retrying in ${process.env.GOOGLE_API_REFRESH_INTERVAL}s. Error:\n${err}`)
            })
        })
        .catch(err => {
            if (err.message === constants.QUOTA_EXHAUSTED_ERROR_MSG && authKeys.length) {
                const newApiKey = authKeys.shift().trim()
                gapi = new googleapis.youtube_v3.Youtube({
                    auth: newApiKey // Replace old API key with the newer one
                })
                console.log(`Quota exceeded for current API key. Updating to new API key: ${newApiKey}`)
            } else {
                console.error(`Error occurred: exhausted. Err:`,err.errors)
            }
        })
}
