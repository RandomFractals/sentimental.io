import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tweets', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes, {useHash: true});
