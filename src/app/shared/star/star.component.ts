import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnInit, OnChanges {

  starWidth: number;
  fiveStarsWidthPx = 86;
  totalStarCount = 5;
  @Input() rating: number;

  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    // this.starWidth = this.rating * 86 / 5;
    this.starWidth = this.rating * this.fiveStarsWidthPx / this.totalStarCount;
  }

  onClick() {
    // The emit method raises the event to the container (product-list in this example) - where event binding is used to listen for and respond to this event.
    this.ratingClicked.emit(`The rating ${this.rating} was clicked!!!`);
  }

}
