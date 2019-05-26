var post = {}

// return trending posts
post.trendings = function (req, res) {
    let trendingIds = req.app.ranker.trendings()
    let trendingPosts = req.app.db.selectIn(Object.keys(trendingIds))
    res.json(trendingPosts)
}

// return all posts
post.all = function (req, res) {
    let allPosts = req.app.db.select('*')
    res.json(allPosts)
}

// vote for a post
post.vote = function (req, res) {
    let data = req.body;

    // verify the vote is toward an existing post
    if (req.app.db.has(data.id)) {
        req.app.mq.send(data)
    }
    // dirty
    setTimeout(() => {
        let data = req.app.db.select('*')
        res.json(data)
    }, 200);
}

// create a new post
post.create = function (req, res) {
    let data = req.body;
    // init votes count
    data.upVotes = 0
    data.downVotes = 0
    let newPostId = req.app.db.insert(data)

    let p = req.app.db.select(newPostId)
    // the only chance for a new post to get into trending is ranker still got some place
    if (!req.app.ranker.full()) {
        // save it to trending list
        req.app.ranker.set(data.id, {upVotes: p.upVotes})
    }

    let trendings = req.app.ranker.trendings()
    res.json(trendings)
}
module.exports = post;