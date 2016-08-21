/**
 * Defines simple User type for this app
 */
export class User {

  name: string;
  screenName: string;
  location: string;
  profileImageUrl: string;
  createdAt: Date;
  followersCount: number;

  // raw JSON data
  private _userData:any;

  constructor (userData:any) {
    this.name = userData.name;
    this.screenName = userData.screen_name;
    this.location = userData.location;
    this.profileImageUrl = userData.profile_image_url;
    this.createdAt = new Date(userData.created_at);
    this.followersCount = Number(userData.followers_count);
    this._userData = userData;
  }
}
