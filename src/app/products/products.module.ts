import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryProductDataService } from './product-data.mock';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProductService } from './product.service';
import { ProductDetailGuard, ProductEditGuard } from './product.guard';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolverService } from './product-resolver.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    ProductRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryProductDataService, { delay: 1000 }), // TODO: Always remove this before going to "production".
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
  exports: [],
  providers: [
    ProductService,
    ProductDetailGuard,
    ProductEditGuard,
    ProductResolverService,
  ],
})
export class ProductsModule { }
