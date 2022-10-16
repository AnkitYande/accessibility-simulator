import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorFilterComponent } from './color-filter/color-filter.component';
import { DexterityMouseComponent } from './dexterity-mouse/dexterity-mouse.component';
import {HomeComponent} from './home/home.component';
import { ScreenReaderComponent } from './screen-reader/screen-reader.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'dexterity-mouse',
    component: DexterityMouseComponent
  },
  {
    path:'screen-reader',
    component: ScreenReaderComponent
  },{
    path:'color-filter',
    component: ColorFilterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
