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
  private _searchTerm:string = 'Data Science'; // default search :)

  // last search response metadata
  private _searchMetadata:any = {};

  // next tweet id for loading more results
  static NextTweetId:string = '';

  constructor (private http: Http) {
  }

  /**
   * Triggers new tweets search.
   */
  search(query) {
    if (this._searchTerm !== query) {
      // reset search term and last tweet id
      this._searchTerm = query;      
      TwitterService.NextTweetId = '';
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

    if (TwitterService.NextTweetId.length > 0 && query.length > 0) {
      // append next tweet id for getting more results
      tweetsQuery = tweetsQuery.concat('/', TwitterService.NextTweetId);
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
    // get json data response
    let results = response.json();

    // get tweets
    //console.log(results);
    let tweets: Array<Tweet> = new Array<Tweet>();
    results.searchResults.forEach(
      tweetData => tweets.push(new Tweet(tweetData)));
    //console.log(tweets);

    // save search metadata for later data queries 
    this._searchMetadata = results.searchMetada;

    // save next tweet id for getting more results
    let nextResultsQuery:string = results.searchMetadata.next_results; 
    console.log(nextResultsQuery);
    TwitterService.NextTweetId = nextResultsQuery
        .substring(8, nextResultsQuery.indexOf('&')); // '?max_id=' str length
    
    console.log(`processTweets::nextTweetId: ${TwitterService.NextTweetId}`);
    
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
