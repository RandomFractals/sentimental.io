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

  constructor (private http: Http) {
  }

  search(query) {
    this._searchTermSource.next(query);
  }


  /**
   * Gets test tweets.
   */
  getTweets(query:string = ''): Observable<Tweet[]> 
  {
    console.log(`getTweets: ${query}`)    
    return this.http.get(`app/tweets/${query}`)
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
    results.forEach(tweet => { 
      tweets.push(new Tweet(tweet));
      console.log(tweet);
    });    
    console.log(tweets);
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
