import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorFilterComponent } from './color-filter/color-filter.component';
import { DexterityMouseComponent } from './dexterity-mouse/dexterity-mouse.component';
import {HomeComponent} from './home/home.component';
import { IntroComponent } from './intro/intro.component';
import { ScreenReaderComponent } from './screen-reader/screen-reader.component';

const routes: Routes = [
  {
    path:'',
    component: IntroComponent,
    data: { animation: 'intro'}
  },
  {
    path:'intro',
    component: IntroComponent,
    data: { animation: 'intro'}
  },
  {
    path:'dexterity-mouse',
    component: DexterityMouseComponent,
    data: { animation: 'dexterity-mouse'}

  },
  {
    path:'screen-reader',
    component: ScreenReaderComponent,
    data: { animation: 'screen-reader'}
  },{
    path:'color-filter',
    component: ColorFilterComponent,
    data: { animation: 'color-filter'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
