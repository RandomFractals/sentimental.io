import { User } from '../models/user';

/**
 * Defines simple Tweet type for this app.
 */
export class Tweet {

  user: User;
  text: string;
  createdAt: Date;
  sentiment: any;

  // raw JSON data
  data:any;

  constructor (tweetData:any) {
    this.user = new User(tweetData.user);
    this.text = tweetData.text.valueOf();
    this.createdAt = new Date(tweetData.created_at);
    this.sentiment = tweetData.sentiment;
    this.data = tweetData;
  }  
}
