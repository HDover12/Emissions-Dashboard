import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/data.service';
import { GlobalColors } from 'src/app/shared/globalcolors';

@Component({
  selector: 'app-visual-list',
  templateUrl: './visual-list.component.html',
  styleUrls: ['./visual-list.component.css']
})
export class VisualListComponent implements OnInit, AfterViewInit {

  constructor(private dataService: DataService, private globalcolors: GlobalColors) { }

  @ViewChild('h4') header!: ElementRef;
  private colorSelected!: Subscription
    
  
  selectedAnalyte(analyte: any) {
       this.dataService.analyteSelected.next(analyte.target.textContent)
   
 
   
  }

  ngAfterViewInit(): void {
    this.header.nativeElement.style.color =
      GlobalColors.colormode.fontcolor;
   
  
  }

  ngOnInit(): void {

  this.colorSelected = this.globalcolors.colorSelected.subscribe(() => {setTimeout(() => {
    this.header.nativeElement.style.color = GlobalColors.colormode.fontcolor;
  }, 0);
  });
;
    
  }

}
