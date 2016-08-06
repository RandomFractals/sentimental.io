import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { TwitterService } from './services/twitter.service';
import { FollowerList } from './followers';
import { TweetList } from './tweets';

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
  },  
  {
    path: '/followers',
    name: 'Followers',
    component: FollowerList
  }
])

export class AppComponent {
  title = 'Twitter Sentiments';
}
