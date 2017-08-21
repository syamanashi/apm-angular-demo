import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
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
    return this.getProducts().map(products => products.filter(product => product.productId === +id)[0])
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse): Observable<Error> {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
