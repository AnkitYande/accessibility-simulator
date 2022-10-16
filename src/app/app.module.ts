import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DexterityMouseComponent } from './dexterity-mouse/dexterity-mouse.component';
import { HomeComponent } from './home/home.component';
import { ScreenReaderComponent } from './screen-reader/screen-reader.component';
import { ColorFilterComponent } from './color-filter/color-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DexterityMouseComponent,
    HomeComponent,
    ScreenReaderComponent,
    ColorFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
