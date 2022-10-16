import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-reader',
  templateUrl: './screen-reader.component.html',
  styleUrls: ['./screen-reader.component.scss']
})
export class ScreenReaderComponent implements OnInit {

  @HostListener('document:keyup', ['$event'])
  onKeyPress(e: KeyboardEvent) {
    let currElement = document.activeElement
    let activeElement = null
    if (currElement != null) {
      if (e.key == 'Tab') {
        activeElement = document.activeElement;
      }
      else if (e.key == 'ArrowDown') {
        activeElement = currElement.nextElementSibling;

      }
      else if (e.key == 'ArrowUp') {
        activeElement = currElement.previousElementSibling;
      }
      else if (e.key == 'ArrowRight') {
        activeElement = currElement.children[0];
      }
      else if (e.key == 'ArrowLeft') {
        activeElement = currElement.parentElement;
      }
    }
    if (activeElement != null && activeElement.className != 'ScreenReaderWrapper' && activeElement.tagName.toLowerCase() != 'script') {
      (activeElement as HTMLElement).focus()
      console.log(activeElement.className )
      this.read(activeElement.textContent!);
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

  read = (msgTxt: string) => {
    window.speechSynthesis.cancel()
    var msg = new SpeechSynthesisUtterance();
    msg.text = msgTxt
    window.speechSynthesis.speak(msg);
  }

}
