import { Component, Input } from '@angular/core';

import { TwitterService } from './shared/twitter.service'

@Component({
  selector: 'twitter-app',
  templateUrl: 'app/app.html',
  styleUrls: ['app/app.css']
})

export class AppComponent {
  // app title
  title:string = 'Twitter Sentiments';

  // global search term
  @Input() term:string = '';

  constructor(private _twitterService: TwitterService) { 
  }
  
  search():void {
    console.log(`search: ${this.term}`);
    this._twitterService.search(this.term);
  }
}
