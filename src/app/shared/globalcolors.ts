import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class GlobalColors {
  colorSelected = new Subject<string>();

  constructor() {}

  public static colormode = {
    chartbgcolor: '#e8e8e8',
    coalcolor: '#1C4E80',
    naturalgascolor: '#0091D5',
    appbgcolor: '#1C4E80',
    componentbgcolor: '#e8e8e8',
    fontcolor: 'black',
  };

  onColorSelect(selection: string) {
    var mainmode = {
      chartbgcolor: '#e8e8e8',
      coalcolor: '#1C4E80',
      naturalgascolor: '#0091D5',
      appbgcolor: '#1C4E80',
      componentbgcolor: '#e8e8e8',
      fontcolor: 'black',
    };

    var darkmode = {
      chartbgcolor: '#252A48',
      coalcolor: '#1C4E80',
      naturalgascolor: '#0091D5',
      appbgcolor: '#181b2d',
      componentbgcolor: '#252A48',
      fontcolor: 'lightgray',
    };

       var rainbowmode = {
         chartbgcolor: '#fcffbc',
         coalcolor: '#ff1493',
         naturalgascolor: '#0000ff',
         appbgcolor:
           'linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3) 0%/1800% no-repeat',
         componentbgcolor: '#fcffbc',
         fontcolor: 'black',
       };

    if (selection == 'mainmode') {
      GlobalColors.colormode = mainmode;
 
    } else if (selection == 'darkmode') {
      GlobalColors.colormode = darkmode;

    }else if (selection == 'rainbowmode') {
      GlobalColors.colormode = rainbowmode;
  }
  }
}
