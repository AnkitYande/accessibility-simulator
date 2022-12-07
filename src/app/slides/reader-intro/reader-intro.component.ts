import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';

@Component({
  selector: 'app-reader-intro',
  templateUrl: './reader-intro.component.html',
  styleUrls: ['./reader-intro.component.scss']
})
export class ReaderIntroComponent implements OnInit {
  constructor() { }
  ngOnInit() { window.scrollTo(0, 0) }
}

