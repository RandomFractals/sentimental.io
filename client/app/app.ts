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
    console.log(`scrollHeight: ${doc.scrollHeight}`);    
    console.log(`scrollTop: ${doc.scrollTop}`);
    console.log(`clientTop: ${doc.clientTop}`);
    console.log(`clientHeight: ${doc.clientHeight}`);
    console.log(`offsetHeight: ${doc.offsetHeight}`);
  }
}
