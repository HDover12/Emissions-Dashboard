import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../../shared/data.service';
import { chartAnimation } from '../../shared/piechart.animation';
import { PlotlyService } from 'angular-plotly.js';
import { GlobalColors } from 'src/app/shared/globalcolors';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-visuals',
  templateUrl: './visuals.component.html',
  styleUrls: ['./visuals.component.css'],
  animations: [
    trigger('chartAnimation', [
      state('hidden', style({ strokeDashoffset: -641 })),
      state('show', style({ strokeDashoffset: -641 })),
      transition(
        '*=>*',
        animate(
          '1500ms',
          keyframes([
            style({ strokeDashoffset: 0 }),
            style({ strokeDashoffset: -641 }),
          ])
        )
      ),
    ]),
    trigger('chartFade', [
      state('start', style({ opacity: 0 })),
      state('stop', style({ opacity: 1 })),
      transition('start=>stop', animate('3000ms')),
      transition('stop=>start', animate('2000ms')),
    ]),
  ],
})
export class VisualsComponent implements OnInit, OnDestroy {
  constructor(
    private dataService: DataService,
    private plotlyService: PlotlyService
  ) {}
  natGas: number = 0;
  coal: number = 0;
  state = 'hidden';
  chartState = 'start';
  bgcolor = GlobalColors.componentbgcolor;
  coalcolor = GlobalColors.coalcolor;
  naturalgascolor = GlobalColors.natuarlgascolor;

  @ViewChild('pieChart', { static: false }) pieChart!: ElementRef;

  private plantSelected!: Subscription;
  private analyteSelected!: Subscription;

  animationEnded(event: any) {}

  ngOnInit(): void {


    this.analyteSelected = this.dataService.analyteSelected.subscribe(
      (didActivate) => {

        this.drawChart(didActivate);
      }
    );
  }

  drawChart(selectedanalyte: string) {
    if (selectedanalyte == 'NOx') {
      this.natGas = this.dataService.noxNatGas;
      this.coal = this.dataService.noxCoal;
    } else if (selectedanalyte == 'CO') {
      this.natGas = this.dataService.coNatGas;
      this.coal = this.dataService.coCoal;
    } else if (selectedanalyte == 'CO2') {
      this.natGas = this.dataService.co2NatGas;
      this.coal = this.dataService.co2Coal;
    } else if (selectedanalyte == 'SO2') {
      this.natGas = this.dataService.so2NatGas;
      this.coal = this.dataService.so2Coal;
    } else if (selectedanalyte == 'Total') {
      this.natGas = this.dataService.totalNG;
      this.coal = this.dataService.totalCoal;
    }

    this.state == 'hidden' ? (this.state = 'show') : (this.state = 'hidden');
    this.chartState == 'start'
      ? (this.chartState = 'stop')
      : (this.chartState = 'start');

    var naturalGas = this.natGas;
    var coal = this.coal;

    var data = [
      {
        values: [coal, naturalGas],
        labels: ['Coal', 'Natural Gas'],

        name: 'Energy Consumption Profile',

        hole: 0.6,

        type: 'pie',
        textposition: 'outside',
        textinfo: `label+percent`,
        marker: {
          colors: [this.coalcolor, this.naturalgascolor],
          line: { color: '#113A63', width: '2' },
        },
        sort: false,
      },
    ];

    var layout = {
      plot_bgcolor: 'transparent',
      autosize: true,
      title: {
        x: 0.1,
        y: 0.1,
      },
      annotations: [
        {
          font: {
            size: 14,
          },
          showarrow: false,
          text: `<b>2021<br>${selectedanalyte} Emissions <br>by Fuel</b>`,
        },
      ],

      showlegend: false,

      paper_bgcolor: this.bgcolor,
    };
    setTimeout(() => {
      this.plotlyService.newPlot(this.pieChart.nativeElement, data, layout);
    }, 0);
  }
  ngOnDestroy(): void {
    this.analyteSelected.unsubscribe();

  }
}
