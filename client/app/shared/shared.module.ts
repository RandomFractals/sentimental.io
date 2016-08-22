import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Sentiment } from './sentiment';
import { TwitterService } from './twitter.service';

@NgModule({
  imports: [ CommonModule ],
  exports: [ CommonModule, FormsModule ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ TwitterService ]
    };
  }
}


@NgModule({
  exports:   [ SharedModule ],
  providers: [ TwitterService ]
})
export class SharedRootModule { }
