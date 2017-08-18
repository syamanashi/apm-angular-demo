import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit {

  starWidth: number;
  rating: number;

  constructor() { }

  ngOnInit() {
  }

}
