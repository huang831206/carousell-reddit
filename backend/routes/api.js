
var router = function(app) {

    app.get('/', function(req, res) {
        res.end('home')
    })

}

module.exports = router;