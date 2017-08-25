import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Detail';
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.productService.getProduct(id).subscribe(data => {
      this.product = data;
      // console.log(this.product);
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
