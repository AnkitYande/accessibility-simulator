import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss']
})
export class ScreenReaderComponent implements OnInit {

  @ViewChild('table') tableRef!: ElementRef;

  constructor() { }
  ngOnInit(): void { }

  tableIndex = [0, 0]

  @HostListener('document:keyup', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    let currElement = document.activeElement
    let activeElement = null

    if (currElement != null) {
      if (e.key == 'Tab') {
        activeElement = document.activeElement;
      }
      else if (e.key == 'ArrowDown') {
        currElement = this.exitIfNeeded(currElement, true);
        activeElement = currElement!.nextElementSibling;
        activeElement = this.enterIfNeeded(activeElement, false);
      }
      else if (e.key == 'ArrowUp') {
        currElement = this.exitIfNeeded(currElement, false);
        activeElement = currElement!.previousElementSibling;
        activeElement = this.enterIfNeeded(activeElement, true);
      }
    }
    if (activeElement != null) {
      console.log(activeElement);
      (activeElement as HTMLElement).focus();
      this.read(activeElement.textContent!, false);
    }

  }



  enterIfNeeded(activeElement: Element | null, enterFromEnd: boolean) {
    if (activeElement) {
      if (activeElement.tagName == "UL") {
        this.read(`unordered list with ${activeElement.children.length} elements`);
        if (!enterFromEnd) {
          return activeElement.children[0];
        } else {
          return activeElement.children[activeElement.children.length - 1];
        }
      }
      if (activeElement.tagName == "FORM") {
        this.read(`Form to buy a NotBook`);
        if (!enterFromEnd) {
          return activeElement.children[0];
        } else {
          return activeElement.children[activeElement.children.length - 1];
        }
      }
      else if (activeElement.tagName == "TABLE") {
        this.tableIndex = [0, 0]
        this.read(`table with ${activeElement.children.length} rows and ${activeElement.children[0].children.length} columns`);
        if (!enterFromEnd) {
          return activeElement.children[0].children[0];
        } else {
          let lastCol: number = activeElement.children[0].children.length - 1;
          return activeElement.children[activeElement.children.length - 1].children[lastCol];
        }
      }
      else if (activeElement.tagName == "TR") {
        if (!enterFromEnd) {
          return activeElement.children[0];
        } else {
          return activeElement.children[activeElement.children.length - 1];
        }
      }
      else if (activeElement.tagName == "BUTTON") {
        this.read(`Button`);
      }
    }
    return activeElement;
  }

  exitIfNeeded(currElement: Element, goingForward: boolean) {
    if ((goingForward && currElement.nextElementSibling == null) || (!goingForward && currElement.previousElementSibling == null)) {
      if (currElement.tagName == "LI") {
        this.read(`Out of list`);
        return currElement.parentElement
      }
      else if (currElement.tagName == "TD" || currElement.tagName == "TH") {
        let el = currElement.parentElement as Element;
        if ((goingForward && el.nextElementSibling != null) || (!goingForward && el.previousElementSibling != null)) {
          return currElement.parentElement
        }
        this.read(`Out of table`);
        return currElement.parentElement!.parentElement
      }
    }
    return currElement
  }

  getFirstChild(activeElement: Element) {
    activeElement = activeElement;
    (activeElement as HTMLElement).focus();
    this.read(activeElement.textContent!, false);
    return activeElement
  }

  getLastChild(activeElement: Element) {
    activeElement = activeElement.children[activeElement.children.length - 1];
    (activeElement as HTMLElement).focus();
    this.read(activeElement.textContent!, false);
    return activeElement
  }

  read = (msgTxt: string, cancel: boolean = true) => {
    if (cancel) { window.speechSynthesis.cancel() }
    var msg = new SpeechSynthesisUtterance();
    msg.text = msgTxt
    window.speechSynthesis.speak(msg);
  }

}
