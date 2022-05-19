import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { PlotlyService } from 'angular-plotly.js';
import { GlobalColors } from 'src/app/shared/globalcolors';
import { DataService } from 'src/app/shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, OnDestroy {
  constructor(
    private plotlyService: PlotlyService,
    private dataService: DataService,
    private globalColors: GlobalColors
  ) {}
  bgcolor = GlobalColors.colormode.chartbgcolor;
  coalcolor = GlobalColors.colormode.coalcolor;
  naturalgascolor = GlobalColors.colormode.naturalgascolor;
  fontcolor = GlobalColors.colormode.fontcolor

  ngArray: number[] = [];
  coalArray: number[] = [];

  @ViewChild('barChart', { static: false }) barChart!: ElementRef;
  @ViewChild('container', { static: false }) container!: ElementRef;

  private plantSelected!: Subscription;
  private colorSelected!: Subscription;

  ngOnInit(): void {
    this.colorSelected = this.globalColors.colorSelected.subscribe(() => {
      setTimeout(() => {
        this.bgcolor = GlobalColors.colormode.chartbgcolor;
        this.coalcolor = GlobalColors.colormode.coalcolor;
        this.naturalgascolor = GlobalColors.colormode.naturalgascolor;
        this.fontcolor = GlobalColors.colormode.fontcolor;
           this.drawChart(this.bgcolor, this.coalcolor, this.naturalgascolor, this.fontcolor);
      }, 0);
    });

    this.plantSelected = this.dataService.selectedPlant.subscribe(
      (didActivate) => {
        this.ngArray = [];
        this.coalArray = [];

        for (let prop of this.dataService.plants) {
          if (prop.name == didActivate) {
            this.ngArray = prop.ngQuarters;
            this.coalArray = prop.coalQuarters;
          }
        }

        this.drawChart(this.bgcolor, this.coalcolor, this.naturalgascolor, this.fontcolor);
      }
    );
  }

  drawChart(bgcolor: string, coalcolor: string, ngcolor: string, fontcolor: string) {
    var trace1 = {
      x: ['Q1', 'Q2', 'Q3', 'Q4'],
      y: this.ngArray,
      name: 'Natural Gas',
      type: 'bar',
      marker: {
        color: ngcolor,
      },
    };

    var trace2 = {
      x: ['Q1', 'Q2', 'Q3', 'Q4'],
      y: this.coalArray,
      name: 'Coal',
      type: 'bar',
      marker: {
        color: coalcolor,
      },
    };

    var data = [trace1, trace2];

    var layout = {
      title: {
        text: `<b>Cost per Fuel</b>`,
        font: {
          size: 22,
          color: fontcolor,
        },
      },
      yaxis: {
        title: `<b>USD (millions)<b>`,
        titlefont: {
          size: 16,
          color: fontcolor,
        },
        tickfont: {
          size: 14,
          color: fontcolor,
        },
      },
      xaxis: {
        title: `<b>2021 Quarters<b>`,
        titlefont: {
          size: 16,
          color: fontcolor,
        },
        tickfont: {
          size: 14,
          color: fontcolor,
        },
      },
      barmode: 'stack',
      autosize: true,
      margin: {
        autoexpand: true,
        b: '50',
      },
      height: '400',
      font: {
        fontcolor,
      },
      paper_bgcolor: bgcolor,
      plot_bgcolor: bgcolor,
      legend: {
        font: {
          color: fontcolor,
        },
      },
    };

    setTimeout(() => {
      this.plotlyService.newPlot(this.barChart.nativeElement, data, layout, {
        responsive: true,
      });
        this.container.nativeElement.style.backgroundColor =
          GlobalColors.colormode.componentbgcolor;
     
    }, 0);
  }

  ngOnDestroy(): void {
    this.plantSelected.unsubscribe();
    this.colorSelected.unsubscribe();
  }
}
