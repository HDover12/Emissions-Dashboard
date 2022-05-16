import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
  constructor(private plotlyService: PlotlyService, private dataService: DataService) {}
  bgcolor = GlobalColors.componentbgcolor;
  coalcolor = GlobalColors.coalcolor;
  naturalgascolor = GlobalColors.natuarlgascolor;
  private plantSelected!: Subscription
  boilerArray: Boiler[] = []
  dataArray:number[] = []
  
  
  onBoilerSelect(selection: string){
   
    for (let monthdata of this.boilerArray) {
         if (selection == monthdata.name) {
        this.dataArray = monthdata.yearData}
    }
  
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
      y: this.dataArray,
      type: 'scatter',
      name: 'Coal',
      line: {
        color: this.coalcolor,
      },
    };

    var data = [trace2];

    var layout = {
      paper_bgcolor: this.bgcolor,
      plot_bgcolor: this.bgcolor,
      title: {
        text: `<b>Annual NOx Emissions for ${selection}<b>`,
        font: {size: 22}
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
          color: 'rgb(107, 107, 107)',
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)',
        },
      },
      xaxis: {
        title: `<b>2021<b>`,
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)',
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)',
        },
      },
    };

    setTimeout(() => {
      this.plotlyService.newPlot(this.lineChart.nativeElement, data, layout, {
        responsive: true,
      });
    }, 0);
  }

  ngOnInit(): void {
    this.plantSelected = this.dataService.selectedPlant.subscribe((didActivate)=>{
    
      this.boilerArray = this.dataService.displayArray
      this.dataArray = this.boilerArray[0].yearData
      this.onBoilerSelect(this.boilerArray[0].name)
        })
    

  }
  ngOnDestroy(): void {
    this.plantSelected.unsubscribe()
  }
}
