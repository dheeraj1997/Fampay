const dbConnection = require('../../config/initializers/database')
const videoSchema = require('../models/videoSchema')
const VideoModel = dbConnection.model('videos', videoSchema)

/**
 * Handles getting of all the data, paginated at 25 results per page
 * @param  req
 * @param  res
 */
module.exports.getPage = (req, res) => {
    // Validate if the user-input is an integer
    let page = 0
    let skipValue = 0

    // Page numbers start from 1, but offset starts from 0 for Mongo.
    if (req.query.pageno !== undefined) {
        if (isNaN(req.query.pageno) || req.query.pageno < 0) {
            return res.status(500).json({ error: 'Only positive integers allowed for page!' })
        }
        page = req.query.pageno - 1
        skipValue = page * 25
    }

    VideoModel.find().sort({ publish_time: -1 }).skip(skipValue).limit(25).then(result => {
        console.log(`Data fetched successfully. Results: ${result.length}`)
        res.status(200).json({ message: 'Data fetched successfully!', data: result })
    }).catch(err => {
        console.error(`Error fetching data. Error:`, err)
        res.status(500).json({ error: err })
    })
}
