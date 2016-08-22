import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

import { Tweet } from './tweet';
import { TwitterService } from '../shared/twitter.service';

import { LinkPipe } from '../utils/link.pipe';
import { RoundPipe } from '../utils/round.pipe';

@Component({
  selector: 'tweets',
  templateUrl: 'app/twitter/tweet.list.html',
  styleUrls: ['app/twitter/tweet.list.css'],
  pipes: [LinkPipe, RoundPipe]
})
export class TweetList implements OnInit {
  errorMessage: string;
  tweets: Tweet[];
  searchTerm: string;
  searchSubscription:Subscription;

  constructor(private _twitterService: TwitterService) { 
  }

  ngOnInit() {
    // setup search subscription
    this.searchSubscription = this._twitterService.search$.subscribe(
      searchTerm => this.getTweets(searchTerm)
    );
  }    

 ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.searchSubscription.unsubscribe();
  }  

  private getTweets(query:string = ''):void {
    this.searchTerm = query;
    this._twitterService.getTweets(query).subscribe(
         tweets => this.tweets = tweets,
         error => this.errorMessage = <any>error);
  }
}
