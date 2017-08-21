import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGuard } from './product.guard';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'products/:id', canActivate: [ ProductGuard ], component: ProductDetailComponent },
    ]),
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  exports: [],
  providers: [ProductService, ProductGuard],
})
export class ProductsModule { }
