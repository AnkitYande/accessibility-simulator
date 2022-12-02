import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import {HomeComponent} from './home/home.component';
import { IntroComponent } from './slides/intro/intro.component';
import { DexterityIntroComponent } from './slides/dexterity-intro/dexterity-intro.component';
import { DexterityMouseComponent } from './dexterity-mouse/dexterity-mouse.component';
import { ColorIntroComponent } from './slides/color-intro/color-intro.component';
import { ColorFilterComponent } from './color-filter/color-filter.component';
import { ColorExploreComponent } from './color-explore/color-explore.component';
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
    path:'dexterity-intro',
    component: DexterityIntroComponent,
    data: { animation: 'dexterity-intro'}
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
  }, 
  {
    path:'color-intro',
    component: ColorIntroComponent,
    data: { animation: 'color-intro'}
  },
  {
    path:'color-filter',
    component: ColorFilterComponent,
    data: { animation: 'color-filter'}
  },
  {
    path:'color-explore',
    component: ColorExploreComponent,
    data: { animation: 'color-explore'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
