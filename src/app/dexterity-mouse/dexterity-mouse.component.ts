import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dexterity-mouse',
  templateUrl: './dexterity-mouse.component.html',
  styleUrls: ['./dexterity-mouse.component.scss']
})


export class DexterityMouseComponent implements OnInit {

  redirection: string = "/color-intro"
  timeLimit: number = 1.02;

  mouseX: number = 0
  mouseY: number = 0;
  value = ""

  @ViewChild('pointer') pointer!: ElementRef;
  @ViewChild('fname') fName!: ElementRef;
  @ViewChild('lname') lName!: ElementRef;
  @ViewChild('submit') submitBtn!: ElementRef;
  @ViewChild('htmlBtn') htmlBtn!: ElementRef;
  @ViewChild('htmlLbl') htmlLbl!: ElementRef;
  @ViewChild('cssBtn') cssBtn!: ElementRef;
  @ViewChild('cssLbl') cssLbl!: ElementRef;
  @ViewChild('jsBtn') jsBtn!: ElementRef;
  @ViewChild('jsLbl') jsLbl!: ElementRef;
  checkedHTML = false;
  checkedCSS = false;
  checkedJS = false;

  constructor() { }
  ngOnInit(): void { }

  mouseMove(e: MouseEvent) {
    this.mouseX = e.clientX + this.rand(-40, 40);
    this.mouseY = e.clientY + this.rand(-40, 40);
    e.stopPropagation();
  }

  mouseDown(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    e.stopImmediatePropagation();
    if (this.elementsOverlap(this.fName, this.pointer)) {
      this.fName.nativeElement.focus();
      this.fName.nativeElement.select();
    }
    if (this.elementsOverlap(this.lName, this.pointer)) {
      this.lName.nativeElement.focus();
      this.lName.nativeElement.select();
    }
    if (this.elementsOverlap(this.htmlBtn, this.pointer) || this.elementsOverlap(this.htmlLbl, this.pointer)) {
      this.htmlBtn.nativeElement.focus();
      this.checkedHTML = !this.checkedHTML;
    }
    if (this.elementsOverlap(this.cssBtn, this.pointer) || this.elementsOverlap(this.cssLbl, this.pointer)) {
      this.cssBtn.nativeElement.focus();
      this.checkedCSS = !this.checkedCSS;
    }
    if (this.elementsOverlap(this.jsBtn, this.pointer) || this.elementsOverlap(this.jsLbl, this.pointer)) {
      this.jsBtn.nativeElement.focus();
      this.checkedJS = !this.checkedJS;
    }
    if (this.elementsOverlap(this.submitBtn, this.pointer)) {
      this.submitBtn.nativeElement.focus();
      if (this.fName.nativeElement.value != "" && this.lName.nativeElement.valuev != "" &&
        (this.checkedHTML || this.checkedCSS || this.checkedJS)) {
        alert("Congrats you filled out the form in time!!")
      } else {
        alert("Missing some elements of the form")
      }
    }

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
