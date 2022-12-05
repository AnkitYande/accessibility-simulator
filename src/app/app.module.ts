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

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReaderIntroComponent } from './slides/reader-intro/reader-intro.component';

@NgModule({
  declarations: [
    AppComponent,
    DexterityMouseComponent,
    ScreenReaderComponent,
    ColorFilterComponent,
    IntroComponent,
    DexterityIntroComponent,
    CountdownTimerComponent,
    ColorIntroComponent,
    ColorExploreComponent,
    ReaderIntroComponent,
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
