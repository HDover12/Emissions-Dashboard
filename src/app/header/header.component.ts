import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../shared/data.service';
import { GlobalColors } from '../shared/globalcolors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private dataService: DataService, private colorselect: GlobalColors) {}
  plant = this.dataService.plants;
  selected = this.dataService.selection;
  @ViewChild('plantSelect') plantSelect!: ElementRef;
  
  private plantSubscription!: Subscription; 

  onPlantSelected(event: any){
  this.dataService.selectedPlants(event);
   this.dataService.selectedPlant.next(event);
  this.dataService.analyteSelected.next('NOx');
 
  }

  onColorSelect(selection: string){
    this.colorselect.colorSelected.next(selection)
    this.colorselect.onColorSelect(selection)
  }

  onNavigate(event: any) {
   
     this.router.navigate(['/']);
  }

  ngOnInit(): void {
    
  this.plantSubscription = this.dataService.selectedPlant.subscribe(

    (didActive) => {
      this.plantSelect.nativeElement.value = didActive
      this.selected = didActive
    }
  )
  
  }

ngOnDestroy(): void {
  this.plantSubscription.unsubscribe
}
}
