import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import { InfiniteScroll } from 'angular2-infinite-scroll';

import { Tweet } from './tweet';
import { TwitterService } from '../shared/twitter.service';

import { LinkPipe } from '../utils/link.pipe';
import { RoundPipe } from '../utils/round.pipe';

@Component({
  selector: 'tweets',
  directives: [InfiniteScroll],
  templateUrl: 'app/twitter/tweet.list.html',
  styleUrls: ['app/twitter/tweet.list.css'],
  pipes: [LinkPipe, RoundPipe]
})
export class TweetList implements OnInit {
  errorMessage: string;
  tweets: Array<Tweet> = new Array<Tweet>();
  searchTerm:string  = '';
  searchSubscription:Subscription;

  constructor(private _twitterService: TwitterService) { 
  }


  /**
   * Subscribes to global search changes
   * for new twitter search query and results display. 
   */
  ngOnInit() {
    // subscribe to global search changes
    this.searchSubscription = this._twitterService.search$.subscribe(
      // get new twitter search results
      searchTerm => this.getTweets(searchTerm)
    );
  }    


  /**
   * Unsubscribes from global search change events.
   */
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.searchSubscription.unsubscribe();
  }  


  /**
   * TrackBy ng function for tweets identity checks.
   */
  trackByTweetId(index:number, tweet:Tweet) {
    return tweet.id;
  }


  /**
   * Infinite scroll down change handler
   * for loading additional results.
   */
  onScrollDown () {
    console.log(`tweet.list::onScrollDown:NextTweetId: ${TwitterService.NextTweetId}`);

    // get additional search results
    this.getTweets(this.searchTerm);
  }

  /**
   * Noop for scroll up, required by infinite scroll lib.
   */
  onScrollUp () {
    console.log('tweet.list::onScrolledUp');
  }


  /**
   * Gets twitter search results for the specified query.
   */
  private getTweets(query:string = ''):void {
    if (this.searchTerm !== query) {
      // reset tweets
      this.tweets = new Array<Tweet>();
      // TODO: pop a spinner over this list view
    }

    // save new query for future list reloads
    this.searchTerm = query;

    // get twitter search results
    this._twitterService.getTweets(query).subscribe(
         //tweets => this.tweets = tweets,
         tweets => tweets.forEach( tweet => { 
           this.tweets.push(tweet)
         }),    
         // TODO: add error message display to the view
         error => this.errorMessage = <any>error);
  }
}
