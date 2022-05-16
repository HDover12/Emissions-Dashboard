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
    private dataService: DataService
  ) {}
  bgcolor = GlobalColors.componentbgcolor;
  coalcolor = GlobalColors.coalcolor
  naturalgascolor = GlobalColors.natuarlgascolor

  ngArray: number[] = []
  coalArray: number[] = []

  @ViewChild('barChart', { static: false }) barChart!: ElementRef;

  private plantSelected!: Subscription;

  ngOnInit(): void {
    this.plantSelected = this.dataService.selectedPlant.subscribe(
      (didActivate) => {
             this.ngArray = [];
             this.coalArray = [];
       
        for (let prop of this.dataService.plants) {
          if (prop.name == didActivate){
          this.ngArray = prop.ngQuarters
          this.coalArray = prop.coalQuarters}
        }
  
         this.drawChart();
      }
    );
  }

  drawChart() {



    var trace1 = {
      x: ['Q1', 'Q2', 'Q3', 'Q4'],
      y: this.ngArray,
      name: 'Natural Gas',
      type: 'bar',
      marker: {
        color: this.naturalgascolor,
      },
    };

    var trace2 = {
      x: ['Q1', 'Q2', 'Q3', 'Q4'],
      y: this.coalArray,
      name: 'Coal',
      type: 'bar',
      marker: {
        color: this.coalcolor,
      },
    };

    var data = [trace1, trace2];

    var layout = {
      title: {text: `<b>Cost per Fuel</b>`,
      font: {
        size: 22
      }
    },
      yaxis: {
        title: `<b>USD (millions)<b>`,
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)',
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)',
        },
      },
      xaxis: {
        title: `<b>2021 Quarters<b>`,
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)',
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)',
        },
      },
      barmode: 'stack',
      autosize: true,
      margin: {
        autoexpand: true,
        b: '50',

      },
      height: '400',

      paper_bgcolor: this.bgcolor,
      plot_bgcolor: this.bgcolor,
    };

    setTimeout(() => {
      this.plotlyService.newPlot(this.barChart.nativeElement, data, layout, {
        responsive: true,
      });
    }, 0);
  }

  ngOnDestroy(): void {
    this.plantSelected.unsubscribe()
  }
}
