import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';

import {
  fader,
  slideInAnimation
} from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader
  ]
})
export class AppComponent {
  title = 'accessibility-simulator';
  check: boolean = false;

  @ViewChild('navToggle') navToggle!: ElementRef;

  constructor(private contexts: ChildrenOutletContexts) { }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
  }

  toggleNav() {
    this.navToggle.nativeElement.checked = false;
  }
}
