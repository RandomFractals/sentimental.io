import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { AppComponent }  from './app';
import { TwitterService } from './services/twitter.service'

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule ],
  declarations: [ AppComponent ],
  providers: [ TwitterService ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }