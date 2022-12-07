import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';

@Component({
  selector: 'app-intro',
  templateUrl: './dexterity-intro.component.html',
  styleUrls: ['./dexterity-intro.component.scss']
})
export class DexterityIntroComponent implements OnInit {
  constructor() { }
  ngOnInit() {window.scrollTo(0, 0)}
}