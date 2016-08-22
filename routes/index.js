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
router.get('/app/tweets/:query?/:maxId?', function(request, response, next) {
  // inject search query from client
  var query = 'Data Science';
  if (request.params.query) {
    query = request.params.query;
  }

  // create tweets search query params
  var queryParams = {
    q: query,
    count: process.env.TWITTER_MAX_COUNT
  }

  if (request.params.maxId) {
    // add max id to get older tweets
    queryParams.max_id = request.params.maxId; 
  }

  // get tweets 
  getTweets(queryParams, response); 
});


/**
 * Gets Twitter search results.
 */
function getTweets(queryParams, httpResponse) {
  var posts = [];
  log('getTweets::query: ', queryParams);
  twitterClient.get('search/tweets', queryParams, 
    function(error, tweets, response) {
      if (error) {
        console.log(error);
        return posts;
      } else {
        // TODO: do some error checking here first
        posts = tweets.statuses;
        log('getTweets::searchMetadata: ', tweets.search_metadata);
        // let's async to get Alchemy sentiments from Watson 
        async.each(posts, getSentiment, function (err) {
          if (err) {
            console.log(err);
            //return next(err);
          } 

          log('getTweets::got sentiments for query: ', queryParams);          
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
  //console.log('getSentiment::text: ' + post.text);
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
