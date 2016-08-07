var express = require('express');
var router = express.Router();
var path = require('path');
var Twitter = require('twitter');
var Watson = require('watson-developer-cloud');

// Create Twitter client rest instance
var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// Create Watson Alchemy Language api client instance
var alchemyClient = Watson.alchemy_language({
  api_key: process.env.ALCHEMY_API_KEY
});

// Expose tweets endpoint for ang2 app
router.get('/app/tweets', function(request, response, next) {
  // TODO: inject search query from client
  var query = 'sentiments'; 

  // TODO: bump it to 100 after front-end is finalized
  var maxCount = 2; // while testing

  // get tweets 
  getTweets(query, maxCount, response); 
});


/**
 * Gets Twitter search results.
 */
function getTweets(query, count, httpResponse) {
  var posts = [];
  twitterClient.get('search/tweets', { 
      q: query, 
      count: count
    }, 
    function(error, tweets, response){
      if (error) {
        console.log(error);
        throw error;
      } else {
        posts = tweets.statuses;

        // test alchemy hookup
        //getSentiment('test');

        httpResponse.send(posts);        
      }      
  });

} // end of getTweets()


/**
 * Gets text sentiment from Watson Alchemy Lang API.
 */
function getSentiment(msg) {
  console.log('getSentiment::text: ' + msg);
  alchemyClient.sentiment({
      text: msg
    }, 
    function (error, response) {
      if (error)
        console.log('getSentiment::error: ', error);
      else {
        console.log(JSON.stringify(response, null, 2));
       }
       return response;
    });  
}

module.exports = router;
