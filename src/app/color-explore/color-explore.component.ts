import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faEye, faEyeSlash, faCheck, faX } from '@fortawesome/free-solid-svg-icons';

var blinder = require('color-blind');

@Component({
  selector: 'app-color-explore',
  templateUrl: './color-explore.component.html',
  styleUrls: ['./color-explore.component.scss']
})
export class ColorExploreComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheck = faCheck;
  faX = faX;

  @ViewChild('image') imageRef!: ElementRef;
  @ViewChild('canvas') canvasRef!: ElementRef;

  imgForm = new FormGroup({
    filterChoice: new FormControl(),
  });

  url: string | null = "assets/fruit.jpg";
  msg = "";
  backgroundColor: any = "#000000";
  textColor: any = "#ffffff";
  contrastRatio: number = 21.00;
  contrastRatioString: string = "21.00";
  showFilter = true;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.imgForm.setValue({ filterChoice: "protanomaly" })
    this.onFormSubmit()
  }

  selectFile(event: any) {

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result as string;
    }

  }

  imgLoad() {
    const image = this.imageRef.nativeElement as HTMLImageElement;
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    let ctx = canvas.getContext("2d", { willReadFrequently: true })
    this.onFormSubmit()
    // if (ctx) {
    //   ctx.fillStyle = "black";
    //   ctx.fillRect(0, 0, canvas.width, canvas.height);
    // }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    this.onFormSubmit()
  }

  onFormSubmit() {
    const image = this.imageRef.nativeElement as HTMLImageElement;
    const canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    let filter = this.imgForm.get('filterChoice')!.value;
    console.log(filter)
    console.log(filter)
    this.draw(image, canvas, filter);
  }

  draw = (img: HTMLImageElement, canvas: HTMLCanvasElement, filter: String) => {
    let ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (ctx != null) {
      ctx.drawImage(img, 0, 0)

      if (this.showFilter) {
        let pix = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data
        const imgData = ctx.createImageData(img.naturalWidth, img.naturalHeight);

        for (let i = 0; i < imgData.data.length; i += 4) {
          const rgbString = `rgb(${pix[i + 0]},${pix[i + 1]},${pix[i + 2]})`
          let RGB

          switch (filter) {
            case "protanomaly":
              RGB = blinder.protanomaly(rgbString, true)
              break;
            case "protanopia":
              RGB = blinder.protanopia(rgbString, true)
              break;
            case "deuteranomaly":
              RGB = blinder.deuteranomaly(rgbString, true)
              break;
            case "deuteranopia":
              RGB = blinder.deuteranopia(rgbString, true)
              break;
            case "tritanomaly":
              RGB = blinder.tritanomaly(rgbString, true)
              break;
            case "tritanopia":
              RGB = blinder.tritanopia(rgbString, true)
              break;
            case "achromatomaly":
              RGB = blinder.achromatomaly(rgbString, true)
              break;
            case "achromatopsia":
              RGB = blinder.achromatopsia(rgbString, true)
              break;
            default:
              alert("no selection")
          }

          imgData.data[i + 0] = RGB.R;
          imgData.data[i + 1] = RGB.G;
          imgData.data[i + 2] = RGB.B;
          imgData.data[i + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
      }
    }
  }

  cFn = (c: number) => (c <= 0.03928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);

  relLuminance = (color: any) => {
    return 0.2126 * this.cFn(color.R / 255) + 0.7152 * this.cFn(color.G / 255) + 0.0722 * this.cFn(color.B / 255)
  }

  calcContrastRatio = (a: any, b: any) => {
    let L1 = this.relLuminance(a)
    let L2 = this.relLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  }

  hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      R: parseInt(result[1], 16),
      G: parseInt(result[2], 16),
      B: parseInt(result[3], 16)
    } : null;
  }

  updateContrastRatio() {
    let a = this.hexToRgb(this.textColor)
    let b = this.hexToRgb(this.backgroundColor)
    let val = this.calcContrastRatio(a, b)
    this.contrastRatio= val;
    this.contrastRatioString = val.toFixed(2);
  }
}
