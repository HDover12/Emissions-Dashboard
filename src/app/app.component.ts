import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { DataService } from './shared/data.service';
import { GlobalColors } from './shared/globalcolors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, GlobalColors],
 
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Emissions-Dashboard';
  bgcolor =GlobalColors.colormode.appbgcolor
  routeUrl = false

constructor(private colorSelect: GlobalColors, 
  private route: ActivatedRoute, 
  private router: Router){}

 

  @ViewChild('container') container!: ElementRef;
  private globalcolors!: Subscription;

  ngAfterViewInit(): void {
    this.container.nativeElement.style.background =
      GlobalColors.colormode.appbgcolor;
this.globalcolors = this.colorSelect.colorSelected.subscribe((color)=>{
  setTimeout(() => {

    this.container.nativeElement.style.background =
      GlobalColors.colormode.appbgcolor;
      if(color == "rainbowmode"){
        this.container.nativeElement.style.animation = 
        "rainbow 20s linear infinite"
      }
  }, 0);
})
   


  }

  ngOnInit(): void {

  
  }
}
