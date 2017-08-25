import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Product } from './product';

@Injectable()
export class ProductService {

  productUrl = './api/products/products.json';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(id: number | string): Observable<Product> {
    if (id === 0) {
      return Observable.of(this.initializeProduct());
    }

    // return this.getProducts().map(products => products.filter(product => product.id === +id)[0])
    return this.getProducts().map((products: Product[]) => products.find(product => product.id === +id))
      .catch(this.handleError);
  }

  saveProduct(product: Product): Observable<Product> {
    console.log(product);
    return Observable.of(product);
  }

  deleteProduct(id: number | string): Observable<number> {
    console.log(id + ' deleted!');
    return Observable.of(+id);
  }

  private handleError(err: HttpErrorResponse): Observable<Error> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }

  initializeProduct(): Product {
    // Return an initialized object
    return {
        id: 0,
        productName: null,
        productCode: null,
        releaseDate: null,
        price: null,
        description: null,
        starRating: null,
        imageUrl: null,
    };
}

}
