import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PlotlyModule } from 'angular-plotly.js';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DataTableComponent } from './display/data-table/data-table.component';
import { VisualsComponent } from './display/visuals/visuals.component';
import { FormsModule } from '@angular/forms';
import * as PlotlyJS from 'plotly.js-dist-min';
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterModule, Routes } from '@angular/router';
import { PlantSelectPipe } from './display/data-table/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VisualListComponent } from './display/visuals/visual-list/visual-list.component';
import { HomeComponent } from './home/home.component';
import { DisplayComponent } from './display/display.component';
import { LineChartComponent } from './display/line-chart/line-chart.component';
import { BarChartComponent } from './display/bar-chart/bar-chart.component';




PlotlyModule.plotlyjs = PlotlyJS;

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: "display", 
  component: DisplayComponent, 
  children: [
    {path: ":plant", component: DisplayComponent},
]
},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DataTableComponent,
    VisualsComponent,
    DropdownDirective,
    VisualListComponent,
    PlantSelectPipe,
    HomeComponent,
    DisplayComponent,
    LineChartComponent,
    BarChartComponent,
  

  ],
  imports: [BrowserModule, FormsModule, PlotlyModule, BrowserAnimationsModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
