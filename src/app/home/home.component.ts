import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/data.service';
import { fadeInAnimation } from '../shared/router-animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private dataservice: DataService) {}

  onNavigate(selection: string) {
    if (selection !== 'none') {
      this.router.navigate(['/display']);
      setTimeout(() => {
        this.dataservice.selectedPlants(selection);
        this.dataservice.analyteSelected.next('NOx');
        this.dataservice.selectedPlant.next(selection);
      }, 1);
    }
  }

  ngOnInit(): void {}
}
