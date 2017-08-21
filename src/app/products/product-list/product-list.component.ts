import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    // If we want to perform some logic every time this value is changed, we can add it here within the setter function.
    // Set the filteredProducts array to the filtered list of products using a JS conditional operator to handle the possibility that the listFilter string is empty, null or undefined - returning the complete products array in that case.
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  errorMessage: string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = this.products;
    },
      error => this.errorMessage = <any>error
    );
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    // Use the array.prototype.filter() method to provide a new array of elements that pass the included test.
    // ES5:
    //    return this.products.filter((product: Product) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    // ES2016:
    return this.products.filter((product: Product) => product.productName.toLocaleLowerCase().includes(filterBy));
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

}
