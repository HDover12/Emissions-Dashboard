import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-visual-list',
  templateUrl: './visual-list.component.html',
  styleUrls: ['./visual-list.component.css']
})
export class VisualListComponent implements OnInit {

  constructor(private dataService: DataService) { }

  selectedAnalyte(analyte: any) {
 
    this.dataService.analyteSelected.next(analyte.target.textContent)
  }

  ngOnInit(): void {

  }

}
