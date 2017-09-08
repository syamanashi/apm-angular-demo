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
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    // const id = +this.route.snapshot.params['id'];
    this.pageTitle += `: ${id}`;
    this.getProduct(id);
  }

  onBack(): void {
    this.router.navigate(['/products'], { queryParamsHandling: 'preserve' });
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      (product: Product) => this.product = product,
      (error: any) => this.errorMessage = <any>error
    );
  }

}
