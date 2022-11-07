import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DexterityMouseComponent } from './dexterity-mouse/dexterity-mouse.component';
import { HomeComponent } from './home/home.component';
import { ScreenReaderComponent } from './screen-reader/screen-reader.component';
import { ColorFilterComponent } from './color-filter/color-filter.component';
import { IntroComponent } from './slides/intro/intro.component';
import { DexterityIntroComponent } from './slides/dexterity-intro/dexterity-intro.component';
import { CountdownTimerComponent } from './util/countdown-timer/countdown-timer.component';
import { ColorIntroComponent } from './slides/color-intro/color-intro.component';

@NgModule({
  declarations: [
    AppComponent,
    DexterityMouseComponent,
    HomeComponent,
    ScreenReaderComponent,
    ColorFilterComponent,
    IntroComponent,
    DexterityIntroComponent,
    CountdownTimerComponent,
    ColorIntroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
