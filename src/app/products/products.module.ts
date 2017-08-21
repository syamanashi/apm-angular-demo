import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [ProductListComponent],
  exports: [ProductListComponent],
})
export class ProductsModule { }
