import { animate, state, style, transition, trigger, stagger, query, keyframes } from '@angular/animations';
import { NONE_TYPE } from '@angular/compiler';
import { Component, DoCheck, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Boiler } from 'src/app/shared/boiler.model';
import { GlobalColors } from 'src/app/shared/globalcolors';

import { DataService } from '../../shared/data.service';
import { QueryShake } from '../../shared/datatable.animation';
import { Plant } from '../../shared/plant.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate(
          '600ms 700ms',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
      transition(':leave', [
        animate('600ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
    trigger('fade', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 1 })),
      transition('*=>*', [
        animate(
          '3000ms',
          keyframes([
            style({ opacity: 1, offset: 0 }),
            style({ opacity: 0, offset: 0.1 }),
            style({ opacity: 0, offset: 0.4 }),
            style({ opacity: 1, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class DataTableComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private globalColors: GlobalColors,
    private route: ActivatedRoute
  ) {}
  state = 'hidden';
  plant = this.dataService.plants;
  boilers = this.plant;
  selectedPlant!: string;
  noxTotal = 0;
  co2Total = 0;
  coTotal = 0;
  so2Total = 0;
  displayArray: Boiler[] = [];

  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild('total', { static: false }) total!: ElementRef;
  @ViewChild('tbodys', {static:false}) tbodys!: ElementRef

  totalState = 'show';

  
  private colorSelected!: Subscription;

  ngOnInit(): void {
    this.route.firstChild?.params.subscribe(params=>{
      this.selectedPlant = params['plant']
     
      this.dataService.selectedPlants(params['plant'])
       this.totalState == 'show'
         ? (this.totalState = 'hide')
         : (this.totalState = 'show');
    
         this.displayArray = this.dataService.displayArray;

         this.noxTotal = 0;
         this.co2Total = 0;
         this.coTotal = 0;
         this.so2Total = 0;
          for (let prop of this.displayArray) {
           this.noxTotal += prop.NOx;
           this.co2Total += prop.CO2;
           this.coTotal += prop.CO;
           this.so2Total += prop.SO2;
         }
     
    })


    setTimeout(() => {
      this.container.nativeElement.style.backgroundColor =
        GlobalColors.colormode.componentbgcolor;
      this.container.nativeElement.style.color =
        GlobalColors.colormode.fontcolor;
        this.total.nativeElement.style.background = 
        GlobalColors.colormode.appbgcolor;
        this.total.nativeElement.style.boxShadow = `0px 0px 0px 6px ${GlobalColors.colormode.componentbgcolor} inset`;
    }, 0);

    this.colorSelected = this.globalColors.colorSelected.subscribe((color) => {
      setTimeout(() => {
        this.container.nativeElement.style.backgroundColor =
          GlobalColors.colormode.componentbgcolor;
        this.container.nativeElement.style.color =
          GlobalColors.colormode.fontcolor;
           this.total.nativeElement.style.background =
             GlobalColors.colormode.appbgcolor;
             this.total.nativeElement.style.boxShadow = `0px 0px 0px 6px ${GlobalColors.colormode.componentbgcolor} inset`;

             
        

              if (color == 'rainbowmode') {
                this.total.nativeElement.style.animation =
                  'rainbow 20s linear infinite';
                let children = this.tbodys.nativeElement.children;
              
                for (let child of children) {
                  if (child.id !== 'total') {
                    child.addEventListener('mouseenter', () => {
                      child.style.backgroundColor = 'yellow';
                    });
                    child.addEventListener('mouseleave', () => {
                      child.style.backgroundColor = 'transparent';
                    });
                  }
                }
              } else if (color == 'darkmode') {
                let children = this.tbodys.nativeElement.children;
         
                for (let child of children) {
                  if (child.id !== 'total') {
                    child.addEventListener('mouseenter', () => {
                      child.style.backgroundColor = '#1C4E80';
                    });
                    child.addEventListener('mouseleave', () => {
                      child.style.backgroundColor = 'transparent';
                    });
                  }
                }
              } else {
                let children = this.tbodys.nativeElement.children;
        
                for (let child of children) {
                  if (child.id !== 'total') {
                    child.addEventListener('mouseenter', () => {
                      child.style.backgroundColor = 'lightgray';
                    });
                    child.addEventListener('mouseleave', () => {
                      child.style.backgroundColor = 'transparent';
                    });
                  }
                }
              }
      }, 0);
    });

  }

  ngOnDestroy(): void {
    this.colorSelected.unsubscribe();
  }
}
