import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DexterityMouseComponent } from './dexterity-mouse/dexterity-mouse.component';
import { ScreenReaderComponent } from './screen-reader/screen-reader.component';
import { ColorFilterComponent } from './color-filter/color-filter.component';
import { IntroComponent } from './slides/intro/intro.component';
import { DexterityIntroComponent } from './slides/dexterity-intro/dexterity-intro.component';
import { CountdownTimerComponent } from './util/countdown-timer/countdown-timer.component';
import { ColorIntroComponent } from './slides/color-intro/color-intro.component';
import { ColorExploreComponent } from './color-explore/color-explore.component';
import { ReaderIntroComponent } from './slides/reader-intro/reader-intro.component';
import { TakeAwaysComponent } from './take-aways/take-aways.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    DexterityIntroComponent,
    DexterityMouseComponent,
    ColorIntroComponent,
    ColorFilterComponent,
    ColorExploreComponent,
    ReaderIntroComponent,
    ScreenReaderComponent,
    TakeAwaysComponent,
    CountdownTimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
