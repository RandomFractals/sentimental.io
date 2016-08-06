import { Component, OnInit } from '@angular/core';

import { Tweet } from './models/tweet';
import { TwitterService } from './services/twitter.service';

@Component({
  selector: 'tweets',
  templateUrl: 'app/tweets.html',
  styleUrls: ['app/tweets.css']
})

export class TweetList implements OnInit {
  errorMessage: string;
  tweets: Tweet[];
  mode = 'Observable';

  constructor(private _TwitterService: TwitterService) { }

  ngOnInit() {
    this._TwitterService.getTweets()
      .subscribe(
         tweets => this.tweets = tweets,
         error =>  this.errorMessage = <any>error);
  }
}
