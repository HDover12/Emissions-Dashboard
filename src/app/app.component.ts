import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
  animations: [
    trigger('routeAnimation', [
      transition(':leave', [animate(300),
        style({
          opacity: 0
        })
      ]

      )
    ]

    )
  ]
})
export class AppComponent implements OnInit{
  title = 'Emissions-Dashboard';



ngOnInit(): void {


  
}
}
