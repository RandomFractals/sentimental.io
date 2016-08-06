import {Injectable} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import '../utils/rx.operators';

import { Tweet } from '../models/tweet';
import { User } from '../models/user';

@Injectable()
export class TwitterService {
  constructor (private http: Http) {}

  /**
   * Gets test tweets.
   */
  getTweets(): Observable<Tweet[]> {
    return this.http.get('app/tweets')
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
  private processTweets(res: Response) {
    let data = res.json();
    return data || {};
  }


  /**
   * Creates user list from raw json users data.
   */
  private processUsers(res: Response) {
    let data = res.json();
    let users: User[] = [];

    for (var item in data){
      let user = data[item];
      let userData: User = {
        name: user.name,
        location: user.location,
        profile_image_url: user.profile_image_url,
        created_at: user.created_at,
        followers_count: user.followers_count
      };
      users.push(userData);
    }
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
