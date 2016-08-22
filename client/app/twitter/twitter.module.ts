import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { TweetList } from './tweet.list';
import { routing } from './twitter.routing';

@NgModule({
  imports:      [ SharedModule, routing ],
  declarations: [ TweetList ],
})
export class TwitterModule { }