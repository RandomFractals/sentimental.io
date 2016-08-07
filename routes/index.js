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
  var query = 'test'; 

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
        return posts;
      } else {
        tweets.statuses.forEach( function(post) {
          posts.push(post);
          // run it through Alchemy sentiments api
          getSentiment(post);
          log('getTweets::sentiment: ', post.sentiment);                    
        }, this);

        // return twitter results with sentiments scores
        httpResponse.send(posts);        
      }      
  });

} // end of getTweets()


/**
 * Gets text sentiment from Watson Alchemy Lang API.
 */
function getSentiment(post) {
  console.log('getSentiment::text: ' + post.text);
  alchemyClient.sentiment({
      text: post.text
    }, 
    function (error, response) {
      if (error)
        console.log('getSentiment::error: ', error);
      else {        
        post.sentiment = response.docSentiment;
        log('getSentiment::response: ', response.docSentiment);        
       }
       return response;
    });  
}


/**
 * Quick obj log func.
 */
function log(msg, obj) {
  console.log(msg + JSON.stringify(obj, null, 2) );         
}


module.exports = router;
