import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit, OnChanges {

  starWidth: number;
  fiveStarsWidthPx = 86;
  totalStarCount = 5;
  rating = 4;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    // this.starWidth = this.rating * 86 / 5;
    this.starWidth = this.rating * this.fiveStarsWidthPx / this.totalStarCount;
  }

}
