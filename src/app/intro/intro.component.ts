import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LocomotiveScroll from 'locomotive-scroll';
// import gsap from 'gsap'
import { ResizeObserver } from '@juggle/resize-observer';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  @ViewChild('scrollContent') scrollContent: ElementRef | undefined;
  scroll: LocomotiveScroll | null = null;

  constructor() {

  }

  ngOnInit() {
    this.scroll = new LocomotiveScroll({
      el: document.querySelector('[shell]') as HTMLElement,
      smooth: true,
    });
  }
  
  ngAfterViewInit() {
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

  // const textrev = gsap.timeline();

  // textrev.from(".stagger-in h3", 2, {
  //   scrollTrigger: (".stagger-in h3"),
  //   repeat: -1,
  //   y: 1000,
  //   ease: "power4.out",
  //   delay: 5,
  //   skewY: 10,
  //   stagger: {
  //     amount: 0.4,
  //   },
  // });


}
function ngAfterViewInit() {
  throw new Error('Function not implemented.');
}

