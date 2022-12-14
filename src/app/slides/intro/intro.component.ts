import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
import { ResizeObserver } from '@juggle/resize-observer';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  @ViewChild('scrollContent') scrollContent: ElementRef | undefined;
  scroll: LocomotiveScroll | null = null;

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0)
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
