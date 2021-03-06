
var router = function(app) {
    
    // the post controller
    var post = require('../controller/PostController.js')

    app.get('/', function(req, res) {
        res.end('home')
    })

    // get trending post list
    app.get('/post/trendings', post.trendings)
    // get all posts
    app.get('/post/all', post.all)
    // vote for a post
    app.post('/post/vote', post.vote)
    // create a new post
    app.post('/post/create', post.create)

}

module.exports = router;