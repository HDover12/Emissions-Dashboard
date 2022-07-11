import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { GlobalColors } from '../shared/globalcolors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private colorselect: GlobalColors) {}
  plant = this.dataService.plants;
  selected!: string
  routeSub!: Subscription;

  @ViewChild('plantSelect', {static: false}) plantSelect!: ElementRef;
 
  
  private plantSubscription!: Subscription; 

  onPlantSelected(selection: any){
     this.router.navigate(['/display', selection]);   
  }

 ngAfterViewInit(): void {
     this.plantSelect.nativeElement.value = this.selected
 }
  

  onColorSelect(selection: string){
    this.colorselect.colorSelected.next(selection)
    this.colorselect.onColorSelect(selection)
  }



  ngOnInit(): void {
  
  this.route.firstChild?.params.subscribe(params=>{
    this.selected = params['plant']
    

   
  })
   
    


  
  }

ngOnDestroy(): void {
  

}
}
