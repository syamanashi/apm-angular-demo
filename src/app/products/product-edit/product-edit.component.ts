import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { NumberValidators } from '../../shared/number.validator';


@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {

  private paramsSubscription: Subscription;
  pageTitle = 'Edit Product';
  productForm: FormGroup;
  product: Product;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.formBuilder.array([]),
      description: ''
    });

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

  onSubmit() {
    console.log(this.productForm.value);
  }

}
