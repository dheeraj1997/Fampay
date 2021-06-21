const getController = require('../controllers/getController');

module.exports = function (router) {
    router.route('/')
        .get(function (req, res, next) {
            res.status(200).send("Will be used to get videos");
        })
    router.route('/get-page/:page')
        .get(getController.getPage)
}