import { NgModule } from '@angular/core';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGuard } from './product.guard';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  exports: [],
  providers: [ProductService, ProductGuard],
})
export class ProductsModule { }
