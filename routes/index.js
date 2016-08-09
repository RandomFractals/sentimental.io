var express = require('express');
var router = express.Router();
var path = require('path');
var async = require('async');
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
  var query = 'TarasNovak';

  // TODO: bump it to 100 after front-end is finalized
  var maxCount = 20; // while testing

  // get tweets 
  getTweets(query, maxCount, response); 
});


/**
 * Gets Twitter search results.
 */
function getTweets(query, count, httpResponse) {
  var posts = [];
  twitterClient.get('search/tweets', {q: query, count: count}, 
    function(error, tweets, response) {
      if (error) {
        console.log(error);
        return posts;
      } else {
        // TODO: do some error checking here first
        posts = tweets.statuses;

        // let's async to get Alchemy sentiments from Watson 
        async.each(posts, getSentiment, function (err) {
          if (err) {
            console.log(err);
            //return next(err);
          } 

          console.log('got sentiments!');          
          httpResponse.send(posts);
        });        
      } 
  });

} // end of getTweets()


/**
 * Gets text sentiment from Watson Alchemy Lang API,
 * and adds it to the post.
 */
function getSentiment(post, callback) {
  console.log('getSentiment::text: ' + post.text);
  alchemyClient.sentiment( 
    {text: post.text}, 
    function (error, response) {
      if (error) {
        post.sentiment = {type: 'unknown'};
        console.log('getSentiment::error: ', error);                
      }
      else {        
        post.sentiment = response.docSentiment;
        //log('getSentiment::response: ', response.docSentiment);        
       }
      // callback to let async know we are done with this task
      callback();
    }
  );
}


/**
 * Quick obj log func.
 */
function log(msg, obj) {
  console.log(msg + JSON.stringify(obj, null, 2) );         
}


module.exports = router;
