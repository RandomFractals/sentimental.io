var express = require('express');
var router = express.Router();
var path = require('path');
var Twitter = require('twitter');
var Watson = require('watson-developer-cloud');

var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


var alchemyLangClient = Watson.alchemy_language({
  api_key: process.env.ALCHEMY_API_KEY
});

router.get('/app/tweets', function(req, res, next) {

  // get tweets
  twitterClient.get('search/tweets', 
    { 
      q: "sentiments",
      count: "2"
    }, 

    function(error, tweets, response){
    if (error) throw error;
    //console.log(tweets);
    //console.log(response);
    res.send(tweets.statuses);
  });

  // test alchemy hookup
  alchemyLangClient.sentiment({text: 'Word on the street Watson is good at text analytics'}, 
    function (err, response) {
      if (err)
        console.log('error:', err);
      else
        console.log(JSON.stringify(response, null, 2));
    });

});

module.exports = router;
