const dbConnection = require('../../config/initializers/database')
const videoSchema = require('../models/videoSchema')
const VideoModel = dbConnection.model('videos', videoSchema)

/**
 * Handles the search functionality. Creates a regexp out of the search string and matches
 * with the database entries.
 * @param  req
 * @param  res
 */
module.exports.search = (req, res) => {
    const searchString = req.params.searchtext

    if (searchString === undefined || searchString === null) {
      res.status(200).json({ error: 'Invalid search string supplied!' })
    } else {
        const searchStringRegexp = new RegExp(searchString.replace(' ', '|'))
        VideoModel.find({
            $or: [{
                title: {
                    $regex: searchStringRegexp, $options: 'i'
                }
            },{
                description: {
                    $regex: searchStringRegexp, $options: 'i'
                }
            }]
        }).sort({ publish_time: -1 }).limit(50).then(result => {
            console.log(`Data fetched successfully. Results: ${result.length}`)
            res.status(200).json({ message: 'Data fetched successfully!', data: result })
        }).catch(err => {
            console.error(`Error fetching data. Error: ${err}`)
            res.status(500).json({ error: err })
        })
    }
}
