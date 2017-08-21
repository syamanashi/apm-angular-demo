import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGuard } from './product.guard';

@NgModule({
  imports: [
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
