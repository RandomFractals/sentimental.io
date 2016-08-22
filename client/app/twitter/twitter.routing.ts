import { RouterModule }  from '@angular/router';

import { TweetList } from './tweet.list';

export const routing = RouterModule.forChild([
  { path: 'tweets', component: TweetList}
]);

