import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StarComponent, ConvertToSpacesPipe],
  exports: [ConvertToSpacesPipe]
})
export class SharedModule { }
