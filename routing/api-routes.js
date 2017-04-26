// contain 2 routes
// a get route with the url /api/friends . this will be used to diplay a json of all possible friends

// a post route with /api/friends . this will be used to handle incoming survey results.  This route will also be used to handle the compatibility logic.


var friendData = require("../data/friends.js");

module.exports = function(app) {
    app.get('/api/friends', function(request, response) {
        response.json(friendData);

    })


    app.post('/api/friends', function(request, response) {
        friendData.push(request.body);

    })




}
