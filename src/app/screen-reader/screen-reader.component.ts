import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss']
})
export class ScreenReaderComponent implements OnInit {

  @ViewChild('start') startRef!: ElementRef;
  @ViewChild('main') mainRef!: ElementRef;
  @ViewChild('table') tableRef!: ElementRef;

  constructor() { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    (this.startRef.nativeElement as HTMLElement).focus();
  }

  skipToMain() {
    (this.mainRef.nativeElement as HTMLElement).focus();
    this.read("Page Header. NotBook");
  }

  tableIndex = [0, 0];
  inTable: boolean = false;
  properLabels:boolean = true;

  @HostListener('document:keyup', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    let currElement = document.activeElement
    let activeElement = null

    if (e.altKey && e.key != null) {
      if (this.inTable) {
        if (e.key == 'ArrowDown') {
          if (this.tableIndex[0] == 4) {
            this.read("Edge of Table")
            return;
          } else {
            this.tableIndex[0]++;
            this.read(`${this.properLabels && this.tableIndex[1] != 0 ? this.getTableCell(this.tableIndex[0],0).textContent: ""} row ${this.tableIndex[0]}`)
          }
        } else if (e.key == 'ArrowUp') {
          if (this.tableIndex[0] == 0) {
            this.read("Edge of Table")
            return;
          } else {
            this.tableIndex[0]--;
            this.read(`${this.properLabels && this.tableIndex[1] != 0 ? this.getTableCell(this.tableIndex[0],0).textContent:""} row ${this.tableIndex[0]}`)
          }
        } else if (e.key == 'ArrowLeft') {
          if (this.tableIndex[1] == 0) {
            this.read("Edge of Table")
            return;
          } else {
            this.tableIndex[1]--;
            this.read(`${this.properLabels && this.tableIndex[0] != 0 ? this.getTableCell(0,this.tableIndex[1]).textContent:""} column ${this.tableIndex[1]},`)
          }
        } else if (e.key == 'ArrowRight') {
          if (this.tableIndex[1] == 3) {
            this.read("Edge of Table")
            return;
          } else {
            this.tableIndex[1]++;
            this.read(`${this.properLabels && this.tableIndex[0] != 0 ? this.getTableCell(0,this.tableIndex[1]).textContent:""} column ${this.tableIndex[1]},`)
          }
        }
        activeElement = this.getTableCell(this.tableIndex[0],this.tableIndex[1])
        console.log(this.tableIndex, activeElement.textContent)
        console.log("*", this.tableRef.nativeElement.children)
      } else {
        this.read("Not in a table")
      }
    } else if (currElement != null) {
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

  getTableCell(x:number,y:number){
    return (this.tableRef.nativeElement as Element).children[x].children[y]
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
        this.inTable = true;
        this.read(`table with ${activeElement.children.length} rows and ${activeElement.children[0].children.length} columns`);
        if (!enterFromEnd) {
          this.tableIndex = [0, 0];
          return activeElement.children[0].children[0];
        } else {
          this.tableIndex = [4, 3];
          let lastCol: number = activeElement.children[0].children.length - 1;
          return activeElement.children[activeElement.children.length - 1].children[lastCol];
        }
      }
      else if (activeElement.tagName == "TR") {
        if (!enterFromEnd) {
          this.tableIndex[1] = 0
          console.log("a", this.tableIndex)
          return activeElement.children[0];
        } else {
          this.tableIndex[1] = 3
          console.log("b", this.tableIndex)
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
          if (goingForward) {
            this.tableIndex[0]++
          } else {
            this.tableIndex[0]--
          }
          this.tableIndex[1] = 0
          console.log("b", this.tableIndex)
          return currElement.parentElement
        }
        this.read(`Out of table`);
        this.inTable = false;
        return currElement.parentElement!.parentElement
      }
    }

    if (currElement.tagName == "TD" || currElement.tagName == "TH") {
      if (goingForward) {
        this.tableIndex[1]++
      } else {
        this.tableIndex[1]--
      }
      console.log("c", this.tableIndex)
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
