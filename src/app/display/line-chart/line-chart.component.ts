import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlotlyService } from 'angular-plotly.js';
import { Subscription } from 'rxjs';
import { Boiler } from 'src/app/shared/boiler.model';
import { DataService } from 'src/app/shared/data.service';
import { GlobalColors } from 'src/app/shared/globalcolors';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit, OnDestroy {
  @ViewChild('lineChart', { static: false }) lineChart!: ElementRef;
  constructor(
    private plotlyService: PlotlyService,
    private dataService: DataService,
    private globalColors: GlobalColors,
    private route: ActivatedRoute
  ) {}

  @ViewChild('container', { static: false }) container!: ElementRef;

  bgcolor = GlobalColors.colormode.componentbgcolor;
  coalcolor = GlobalColors.colormode.coalcolor;
  naturalgascolor = GlobalColors.colormode.naturalgascolor;
  fontcolor = GlobalColors.colormode.fontcolor;
  boilerSelection = '';


  private plantSelected!: Subscription;
  private colorSelected!: Subscription;

  boilerArray: Boiler[] = [];
  dataArray: number[] = [];

  onBoilerSelect(selection: string) {
    for (let monthdata of this.boilerArray) {
      if (selection == monthdata.name) {
        this.dataArray = monthdata.yearData;
        this.boilerSelection = selection;
      }
    }
    this.drawChart(
      this.dataArray,
      this.bgcolor,
      this.coalcolor,
      this.naturalgascolor,
      this.fontcolor
    );
  }

  ngOnInit(): void {
    this.colorSelected = this.globalColors.colorSelected.subscribe(() => {
      setTimeout(() => {
        this.bgcolor = GlobalColors.colormode.chartbgcolor;
        this.coalcolor = GlobalColors.colormode.coalcolor;
        this.naturalgascolor = GlobalColors.colormode.naturalgascolor;
        this.fontcolor = GlobalColors.colormode.fontcolor;
    

        this.drawChart(
          this.dataArray,
          this.bgcolor,
          this.coalcolor,
          this.naturalgascolor,
          this.fontcolor
        );
      }, 0);
    });

    this.route.firstChild?.params.subscribe(params=>{
 this.boilerArray = this.dataService.displayArray;
 this.dataArray = this.boilerArray[0].yearData;
 this.onBoilerSelect(this.boilerArray[0].name);
    })

  }
  ngOnDestroy(): void {
 
    this.colorSelected.unsubscribe();
  }

  drawChart(
    dataArray: number[],
    bgcolor: string,
    coalcolor: string,
    naturalgascolor: string,
    fontcolor: string
  ) {
    var trace2 = {
      x: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      y: dataArray,
      type: 'scatter',
      name: 'Coal',
      line: {
        color: coalcolor,
      },
    };

    var data = [trace2];

    var layout = {
      font: {color: fontcolor},
      paper_bgcolor: bgcolor,
      plot_bgcolor: bgcolor,
      title: {
        text: `<b>Annual NOx Emissions for ${this.boilerSelection}<b>`,
        font: { size: 22 },
      },
      margin: {
        autoexpand: true,
        l: '100',
      },
      autosize: true,
      yaxis: {
        title: `<b>Emission Rate (lb/MMBtu)<b>`,
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
        title: `<b>2021<b>`,
        titlefont: {
          size: 16,
          color: fontcolor,
        },
        tickfont: {
          size: 14,
          color: fontcolor,
        },
      },
    };

    setTimeout(() => {
      this.plotlyService.newPlot(this.lineChart.nativeElement, data, layout, {
        responsive: true,
      });
          this.container.nativeElement.style.backgroundColor =
            GlobalColors.colormode.componentbgcolor;
    }, 0);
  }
}
