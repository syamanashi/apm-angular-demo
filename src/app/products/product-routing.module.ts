import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailGuard, ProductEditGuard } from './product.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolverService } from './product-resolver.service';

const productRoutes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', canActivate: [ ProductDetailGuard ], component: ProductDetailComponent, resolve: { product: ProductResolverService }},
  { path: 'products/:id/edit', canDeactivate: [ ProductEditGuard ], component: ProductEditComponent, resolve: { product: ProductResolverService }},
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }
