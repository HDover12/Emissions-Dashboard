import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../../shared/data.service';


@Pipe({
  name: 'filter'
})

export class PlantSelectPipe implements PipeTransform {
    constructor(private selectorService: DataService){}

    transform(value: any, selectorString: string) {
       let displayArray = []
       for (let item of value) {
           if (selectorString == item.name) {
               displayArray.push(item)
           }
          
       }
      for(let prop of displayArray) {
        for(let boiler of prop.boilers) {
          if (boiler.fuel == 'Coal'){
             this.selectorService.noxCoal += boiler.NOx;
             this.selectorService.co2Coal += boiler.CO2;
             this.selectorService.coCoal += boiler.CO;
             this.selectorService.so2Coal += boiler.SO2;
          } else if (boiler.fuel == 'Natural Gas') {
            this.selectorService.noxNatGas += boiler.NOx;
            this.selectorService.co2NatGas += boiler.CO2;
            this.selectorService.coNatGas += boiler.CO;
            this.selectorService.so2NatGas += boiler.SO2;
          }
        }
      }
 this.selectorService.totalCoal =
   this.selectorService.noxCoal +
   this.selectorService.coCoal +
   this.selectorService.co2Coal +
   this.selectorService.so2Coal;
 this.selectorService.totalNG =
   this.selectorService.noxNatGas +
   this.selectorService.coNatGas +
   this.selectorService.co2NatGas +
   this.selectorService.so2NatGas;
      return displayArray
  
    }
   
}

