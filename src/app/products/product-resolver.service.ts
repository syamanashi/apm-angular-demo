import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Product } from './product';
import { ProductService } from './product.service';

@Injectable()
export class ProductResolverService implements Resolve<Product> {

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {

    // const id = +route.params['id'];
    // return this.productService.getProduct(id);

    const id = route.params['id']; // No +cast operator so we can include the original param value in the error message or log.
    if (isNaN(id)) {
      console.log(`Product id was not a number: ${id}`); // TODO: add an error logging mechanism as well ad display an error to the user.
      this.router.navigate(['/products']);
      return Observable.of(null);
    }
    return this.productService.getProduct(+id) // Uses +cast operator to ensure a number id is passed in.
      .map(product => { // .map operator allows us to access the returned data before passing it on, allowing us to check if we did indeed receive a product.
        if (product) {
          return product;
        }
        console.log(`Product was not found: ${id}`);
        this.router.navigate(['/products']);
        return null;
      })
      .catch(error => {
        console.log(`Retrieval error: ${error}`);
        this.router.navigate(['/products']);
        return Observable.of(null);
      });
  }

}
