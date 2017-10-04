import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { COMPONENTS } from './components';
import { SERVICES } from './services';
import {MaterialModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule
    
  ],
  providers: [ SERVICES ],
  bootstrap: [AppComponent]
})
export class AppModule { }
