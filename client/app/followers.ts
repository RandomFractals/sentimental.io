import { Component, OnInit } from '@angular/core';

import { TwitterService } from './services/twitter.service';
import { User } from './models/user';

@Component({
  selector: 'followers',
  templateUrl: 'app/followers.html',
  styleUrls: [ 'app/followers.css' ]
})

export class FollowerList implements OnInit {
  errorMessage: string;
  users: User[];
  mode = 'Observable';

  constructor(private _TwitterService: TwitterService) { }

  ngOnInit() {
   this._TwitterService.getFollowers()
     .subscribe(
        users => this.users = users,
        error =>  this.errorMessage = <any>error);
    }
}
