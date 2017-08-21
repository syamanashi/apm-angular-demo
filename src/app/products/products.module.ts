import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  exports: [ProductListComponent],
  providers: [ProductService],
})
export class ProductsModule { }
