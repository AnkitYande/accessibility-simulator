import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
var blinder = require('color-blind');

@Component({
  selector: 'app-color-filter',
  templateUrl: './color-filter.component.html',
  styleUrls: ['./color-filter.component.scss']
})

export class ColorFilterComponent implements OnInit {

  @ViewChild('image') imageRef!: ElementRef;
  @ViewChild('canvas') canvasRef!: ElementRef;

  constructor() { }

  ngOnInit(): void { }

  onImageLoad(): void {
    const image = this.imageRef.nativeElement as HTMLImageElement;
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    console.log(image.complete)
    this.draw(image, canvas);
  }


  // cFn = (c) => (c <= 0.03928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);

  // relLuminance = ([R, G, B]) => 0.2126 * cFn(R / 255) + 0.7152 * cFn(G / 255) + 0.0722 * cFn(B / 255)

  // contrastRatio = (a, b) => {
  //   let L1 = relLuminance(a)
  //   let L2 = relLuminance(b)
  //   return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  // }


  draw = (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
    let ctx = canvas.getContext("2d")
    if (ctx != null) {
      ctx.drawImage(img, 0, 0)
      let imgData1 = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight)

      let pix = imgData1.data;
      console.log(pix)

      const imgData = ctx.createImageData(img.naturalWidth, img.naturalHeight);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const RGB = blinder.deuteranopia(`rgb(${pix[i + 0]},${pix[i + 1]},${pix[i + 2]})`, true)
        imgData.data[i + 0] = RGB.R
        imgData.data[i + 1] = RGB.G
        imgData.data[i + 2] = RGB.B
        imgData.data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
    }
  }

}
