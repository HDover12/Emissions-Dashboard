import { Plant } from "./plant.model"
import { Boiler } from "./boiler.model"
import { Subject } from "rxjs";
import { ActivatedRoute } from "@angular/router";

export class DataService {

  

  analyteSelected = new Subject<string>();
  selectedPlant = new Subject<string>();



  totalCoal = 0;
  totalNG = 0;
  noxNatGas = 0;
  noxCoal = 0;
  co2NatGas = 0;
  co2Coal = 0;
  coNatGas = 0;
  coCoal = 0;
  so2NatGas = 0;
  so2Coal = 0;
  selection = '';
  displayArray: Boiler[] = [];
  selectedPlants(selection: string) {
    this.noxNatGas = 0;
    this.noxCoal = 0;
    this.co2NatGas = 0;
    this.co2Coal = 0;
    this.coNatGas = 0;
    this.coCoal = 0;
    this.so2NatGas = 0;
    this.so2Coal = 0;
    this.displayArray = [];
    for (let item of this.plants) {
      if (selection == item.name) {
        this.displayArray = item.boilers;
      }
    }
    for (let prop of this.displayArray) {
      if (prop.fuel == 'Coal') {
        this.noxCoal += prop.NOx;
        this.co2Coal += prop.CO2;
        this.coCoal += prop.CO;
        this.so2Coal += prop.SO2;
        this.totalCoal += prop.NOx + prop.CO2 + prop.CO + prop.SO2;
      } else if (prop.fuel == 'Natural Gas') {
        this.noxNatGas += prop.NOx;
        this.co2NatGas += prop.CO2;
        this.coNatGas += prop.CO;
        this.so2NatGas += prop.SO2;
        this.totalNG += prop.NOx + prop.CO2 + prop.CO + prop.SO2;
      }
    }
  }

  plants: Plant[] = [
    new Plant(
      'Plant A',
      [
        new Boiler(
          'Boiler A',
          'Coal',
          0.457,
          2.591,
          0.208,
          208,
          [
            0.583, 0.588, 0.608, 0.433, 0.501, 0.542, 0.59, 0.5, 0.567, 0.513,
            0.467, 0.455,
          ]
        ),

        new Boiler(
          'Boiler B',
          'Natural Gas',
          0.09,
          0,
          0.04,
          165,
          [
            0.11, 0.08, 0.07, 0.09, 0.11, 0.13, 0.16, 0.17, 0.15, 0.09, 0.11,
            0.09,
          ]
        ),
        new Boiler(
          'Boiler C',
          'Natural Gas',
          0.07,
          0,
          0.05,
          112,
          [
            0.063, 0.09, 0.13, 0.11, 0.123, 0.14, 0.15, 0.18, 0.14, 0.11, 0.07,
            0.08,
          ]
        ),
      ],
      [2, 3, 4, 5],
      [2, 1, 2, 1]
    ),
    new Plant(
      'Plant B',
      [
        new Boiler(
          'Boiler 1',
          'Coal',
          0.477,
          3.591,
          0.108,
          218,
          [
            0.421, 0.441, 0.461, 0.481, 0.446, 0.523, 0.567, 0.587, 0.428,
            0.441, 0.453, 0.433,
          ]
        ),
        new Boiler(
          'Boiler 2',
          'Natural Gas',
          0.1,
          0,
          0.04,
          115,
          [
            0.082, 0.1, 0.13, 0.15, 0.18, 0.22, 0.21, 0.17, 0.17, 0.13, 0.11,
            0.07,
          ]
        ),
        new Boiler(
          'Boiler 3',
          'Coal',
          0.06,
          3.2,
          0.02,
          109,
          [
            0.496, 0.509, 0.482, 0.437, 0.444, 0.534, 0.561, 0.61, 0.522, 0.489,
            0.421, 0.432,
          ]
        ),
      ],
      [3, 3, 4, 5],
      [2, 4, 6, 2]
    ),
    new Plant(
      'Plant C',
      [
        new Boiler(
          'Boiler W',
          'Natural Gas',
          0.07,
          0,
          0.05,
          112,
          [
            0.064, 0.07, 0.12, 0.11, 0.13, 0.16, 0.15, 0.18, 0.14, 0.09, 0.07,
            0.08,
          ]
        ),
        new Boiler(
          'Boiler X',
          'Coal',
          0.45,
          3.91,
          0.18,
          217,
          [
            0.544, 0.52, 0.621, 0.589, 0.554, 0.561, 0.61, 0.627, 0.578, 0.588,
            0.499, 0.478,
          ]
        ),
        new Boiler(
          'Boiler Y',
          'Natural Gas',
          0.1,
          0,
          0.045,
          114,
          [
            0.123, 0.08, 0.12, 0.15, 0.15, 0.12, 0.19, 0.16, 0.13, 0.06, 0.1,
            0.06,
          ]
        ),
        new Boiler(
          'Boiler Z',
          'Coal',
          0.06,
          2.9,
          0.02,
          109,
          [
            0.51, 0.478, 0.488, 0.452, 0.564, 0.538, 0.527, 0.631, 0.62, 0.547,
            0.51, 0.49,
          ]
        ),
      ],
      [1, 2, 5, 3],
      [3, 1, 4, 2]
    ),
  ];
}