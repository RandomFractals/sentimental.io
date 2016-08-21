import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { TweetList } from './tweet.list';
import { TwitterService } from './services/twitter.service';

@Component({
  selector: 'twitter-app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    TwitterService
  ]
})

@RouteConfig([
  {
    path: '/',
    name: 'Tweets',
    component: TweetList,
    useAsDefault: true
  }
])

export class AppComponent {
  title = 'Twitter Sentiments';
}
