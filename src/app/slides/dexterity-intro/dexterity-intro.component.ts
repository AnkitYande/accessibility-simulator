import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';

@Component({
  selector: 'app-intro',
  templateUrl: './dexterity-intro.component.html',
  styleUrls: ['./dexterity-intro.component.scss']
})
export class DexterityIntroComponent implements OnInit {

  @ViewChild('scrollContent') scrollContent: ElementRef | undefined;
  scroll: LocomotiveScroll | null = null;

  constructor() { }

  ngOnInit() {
    setTimeout(() =>
      this.scroll = new LocomotiveScroll({
        el: document.querySelector('[shell]') as HTMLElement,
        smooth: true,
      })
      , 1000)
  }

  ngAfterViewInit() {
    // fix scroll on resize
    const ro = new ResizeObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
        if (this.scroll) {
          this.scroll.update();
        }
      });
    });

    ro.observe(this.scrollContent!.nativeElement);
  }

  ngOnDestroy() {
    this.scroll!.destroy();
  }

}