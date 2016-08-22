import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

// app root
import { AppComponent }  from './app';

// feature modules
import { TwitterModule } from './twitter/twitter.module'
import { SharedModule } from './shared/shared.module'

// app routes
import { routing } from './app.routing'

@NgModule({
  imports: [ 
    BrowserModule, 
    FormsModule, 
    HttpModule,
    TwitterModule,
    routing,
    SharedModule.forRoot()],

  declarations: [ AppComponent ],

  bootstrap: [ AppComponent ]
})

export class AppModule { }