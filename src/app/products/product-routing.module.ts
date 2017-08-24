import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductGuard, ProductEditGuard } from './product.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';

const productRoutes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', canActivate: [ ProductGuard ], component: ProductDetailComponent },
  { path: 'productEdit/:id', canDeactivate: [ ProductEditGuard ], component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
