import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
var blinder = require('color-blind');

@Component({
  selector: 'app-color-filter',
  templateUrl: './color-filter.component.html',
  styleUrls: ['./color-filter.component.scss']
})

export class ColorFilterComponent implements OnInit {

  slideShow = [
    ["assets/map_imgs/low1.png", "severe", false, "Now lets see what this map looks like with deuteranopia color blindness"],
    ["assets/map_imgs/low2.png", "high", true, "Lets do another example using this map!"],
    ["assets/map_imgs/low3.png", "low", true, "Now lets look at the same map with higher contrast between the four colors"],
    ["assets/map_imgs/high1.png", "high", false, "Now lets see what this map looks like with deuteranopia color blindness"],
    ["assets/map_imgs/high2.png", "low", true, "Lets do another example using this map!"],
    ["assets/map_imgs/high3.png", "medium", true,  "Now lets look at a map presents the same information using only one color. However, it uses even greater contrast making it easy for both users with and without color blindness"],
    ["assets/map_imgs/red1.png", "medium", false,"Now lets see what this map looks like with deuteranopia color blindness"],
    ["assets/map_imgs/red2.png", "severe", true, "Lets do another example using this map!"],
    ["assets/map_imgs/red3.png", "low", true, "Great Job!"]
  ];

  @ViewChild('image') imageRef!: ElementRef;
  @ViewChild('canvas') canvasRef!: ElementRef;
  imgSrc = "assets/map_imgs/low1.png"
  applyFilter: boolean = false;
  headderText: string = "Select the Severity of the highlighted region";
  overlayText: string = ""
  filterOpacity:String = "brightness(100%)";
  index = 0;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onImageLoad(): void {
    console.log("img load fired")
    const image = this.imageRef.nativeElement as HTMLImageElement;
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    this.draw(image, canvas);
  }

  draw = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (ctx != null) {
      ctx.drawImage(img, 0, 0)

      let pix = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data
      const imgData = ctx.createImageData(img.naturalWidth, img.naturalHeight);

      for (let i = 0; i < imgData.data.length; i += 4) {
        if (!(pix[i + 0] == 0 && pix[i + 1] == 223 && pix[i + 2] == 0)) {
          const RGB = blinder.deuteranopia(`rgb(${pix[i + 0]},${pix[i + 1]},${pix[i + 2]})`, true)
          imgData.data[i + 0] = RGB.R;
          imgData.data[i + 1] = RGB.G;
          imgData.data[i + 2] = RGB.B;
          imgData.data[i + 3] = 255;
        } else {
          imgData.data[i + 0] = 0;
          imgData.data[i + 1] = 223;
          imgData.data[i + 2] = 0;
          imgData.data[i + 3] = 255;
        }
      }

      if (this.applyFilter) {
        ctx.putImageData(imgData, 0, 0);
      }
    }
    this.headderText = "Select the Severity of the highlighted region";
    this.overlayText = ""
    this.filterOpacity = "brightness(100%)";
  }

  sevPress() {
    this.btnPress("severe");
  }
  highPress() {
    this.btnPress("high");
  }
  medPress() {
    this.btnPress("medium");
  }
  lowPress() {
    this.btnPress("low")
  }

  btnPress(selection: string) {
    this.filterOpacity = "brightness(25%)"
    if (selection == this.slideShow[this.index][1]) {
      this.overlayText = "Correct!";
    } else {
      this.overlayText = "Incorrect!";
    }
    this.headderText = this.slideShow[this.index][3] as string;
    this.index++;
    if (this.index < this.slideShow.length) {
      this.applyFilter = this.slideShow[this.index][2] as boolean;
      this.imgSrc = this.slideShow[this.index][0] as string;
    } else {
      setTimeout(() =>
        this.router.navigateByUrl("/color-explore")
      , 1500)
    }
  }

}
