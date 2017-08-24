import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Product } from '../product';
import { ProductService } from '../product.service';


@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {

  private paramsSubscription: Subscription;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit() {

    // Read the product Id from the route parameter
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getProduct(id);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    // Watch for the blur event from any input element on the form.
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
      console.log(product);
    });
  }

}
