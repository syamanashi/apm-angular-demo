import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';

  constructor() { }

  ngOnInit() {
  }

}
