import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../shared/router-animations';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class DisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
