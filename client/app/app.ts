import { Component, Input, HostListener } from '@angular/core';

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

  @HostListener('window:onscroll', ['$event'])
  onWindowScroll(event) {
    // TODO: check scrollbar position
    // and get the next set of tweets if at the bottom of the page
    let doc = event.target.documentElement;
    console.log(event);
    console.log(`scrollTop: ${doc.scrollTop} scrollHeight: ${doc.scrollHeight} clientTop: ${doc.clientTop} clientHeight: ${doc.clientHeight} offsetHeight: ${doc.offsetHeight}`);
  }
}
