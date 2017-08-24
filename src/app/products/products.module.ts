import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGuard, ProductEditGuard } from './product.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    ProductRoutingModule,
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
  exports: [],
  providers: [ProductService, ProductGuard, ProductEditGuard],
})
export class ProductsModule { }
