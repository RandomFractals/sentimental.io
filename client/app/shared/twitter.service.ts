import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import '../utils/rx.operators';

import { Tweet } from '../twitter/tweet';
import { User } from '../twitter/user';

@Injectable()
export class TwitterService {

  // twitter search term Observable source
  private _searchTermSource = new BehaviorSubject<string>('');

  search$ = this._searchTermSource.asObservable();

  // last search term
  private _searchTerm:string = '';

  // last tweet id for pagination
  static LastTweetId:number = -1; 

  constructor (private http: Http) {
  }

  /**
   * Triggers new tweets search.
   */
  search(query) {
    if (this._searchTerm !== query) {
      // reset search term and last tweet id
      this._searchTerm = query;      
      TwitterService.LastTweetId = -1;
      console.log('search: new query: ' + query)
    }
    // notify clients about query change
    this._searchTermSource.next(query);    
  }


  /**
   * Gets tweet results.
   */
  getTweets(query:string = ''): Observable<Tweet[]> 
  {
    // construct tweets data query
    let tweetsQuery:string = `app/tweets/${query}`;

    if (TwitterService.LastTweetId > 0 && query.length > 0) {
      // append last tweet id - 1 for pagination
      tweetsQuery = tweetsQuery.concat('/', (TwitterService.LastTweetId - 1).toString());
    } 
    console.log(`getTweets: ${tweetsQuery}`);

    // get tweets
    return this.http.get(tweetsQuery)
                    .map(this.processTweets)
                    .catch(this.handleError);
  }


  /**
   * Gets test user followers.
   */
  getFollowers(): Observable<User[]> {
    return this.http.get('app/followers')
                    .map(this.processUsers)
                    .catch(this.handleError);
  }


  /**
   * Creates tweets list from raw json tweets data.
   */
  private processTweets(response: Response) {
    let results = response.json();
    let tweets: Tweet[] = []
    results.forEach(tweetData => {
      let tweet:Tweet = new Tweet(tweetData);  
      tweets.push(tweet);
      console.log(tweetData);
    });    
    console.log(tweets);

    // save last tweet id for pagination
    TwitterService.LastTweetId = tweets[tweets.length-1].id;
    
    return tweets;
  }


  /**
   * Creates user list from raw json users data.
   */
  private processUsers(response: Response) {
    let results = response.json();
    let users: User[] = [];
    results.forEach(user => { 
      users.push(new User(user));
      console.log(user);
    });    
    return users;
  }


  /**
   * Handles error messages.
   */
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }
}
