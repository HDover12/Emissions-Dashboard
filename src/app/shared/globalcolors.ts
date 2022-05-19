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
         chartbgcolor: '#f8fe85',
         coalcolor: '#ff6464',
         naturalgascolor: '#ffbd67',
         appbgcolor: '#5be7a9',
         componentbgcolor: '#f8fe85',
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
