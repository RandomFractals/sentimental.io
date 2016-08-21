import { Component, OnInit } from '@angular/core';

import { Tweet } from './models/tweet';
import { TwitterService } from './services/twitter.service';
import { LinkPipe } from './utils/link.pipe';
import { RoundPipe } from './utils/round.pipe';

@Component({
  selector: 'tweets',
  templateUrl: 'app/tweets.html',
  styleUrls: ['app/tweets.css'],
  pipes: [LinkPipe, RoundPipe]
})
export class TweetList implements OnInit {
  errorMessage: string;
  tweets: Tweet[];
  mode = 'Observable';

  constructor(private _twitterService: TwitterService) { 
  }

  ngOnInit() {
    this.getTweets();
  }    

  private getTweets(query = '') {
    this._twitterService.getTweets().subscribe(
         tweets => this.tweets = tweets,
         error =>  this.errorMessage = <any>error);
  }
}
