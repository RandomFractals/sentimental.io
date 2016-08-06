var express = require('express');
var router = express.Router();
var path = require('path');
var Twitter = require('twitter');

var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


router.get('/app/tweets', function(req, res, next) {
  twitterClient.get('search/tweets', { q: "sentiments"}, function(error, tweets, response){
    if (error) throw error;
    //console.log(tweets);
    //console.log(response);
    res.send(tweets.statuses);
  });
});

module.exports = router;
