import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';

@Component({
  selector: 'app-color-intro',
  templateUrl: './color-intro.component.html',
  styleUrls: ['./color-intro.component.scss']
})
export class ColorIntroComponent implements OnInit {
  constructor() { }
  ngOnInit() {window.scrollTo(0, 0)}
}

