const getController = require('../controllers/getController');
const searchController = require('../controllers/searchController');

module.exports = function (router) {
    router.route('/')
        .get(function (req, res, next) {
            res.status(200).send("Will be used to get videos");
        })
    router.route('/list')
        .get(getController.getPage)
    router.route('/search/:searchtext')
        .get(searchController.search)
}