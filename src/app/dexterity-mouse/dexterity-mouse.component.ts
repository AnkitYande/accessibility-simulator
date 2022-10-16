import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dexterity-mouse',
  templateUrl: './dexterity-mouse.component.html',
  styleUrls: ['./dexterity-mouse.component.scss']
})


export class DexterityMouseComponent implements OnInit {

  mouseX: number = 0;
  mouseY: number = 0;

  @ViewChild('pointer') pointer!: ElementRef;
  @ViewChild('button1') b1!: ElementRef;
  @ViewChild('button2') b2!: ElementRef;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX + this.rand(-50, 50);
    this.mouseY = e.clientY + this.rand(-50, 50);
  }
  
  @HostListener('document:mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    if (this.elementsOverlap(this.b1, this.pointer)) {
      alert("That was hard to press!")
    }
    if (this.elementsOverlap(this.b2, this.pointer)) {
      alert("That was easy to press!")
    }
  }

  constructor() { }

  ngOnInit(): void {

  }

  elementsOverlap(el1: ElementRef, el2: ElementRef) {
    const domRect1 = el1.nativeElement.getBoundingClientRect();
    const domRect2 = el2.nativeElement.getBoundingClientRect();

    return (
      domRect1.top < domRect2.top &&
      domRect1.bottom > domRect2.top &&
      domRect1.left < domRect2.left &&
      domRect1.right > domRect2.left
    );
  }

  rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
