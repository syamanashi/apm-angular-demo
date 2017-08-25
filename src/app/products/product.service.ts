import { Injectable } from '@angular/core';
import { Http, Response, ResponseType, Headers, RequestOptions } from '@angular/http';
// TODO: Update this service to utilize HttpClient once in-memory-web-api supports it: https://github.com/angular/in-memory-web-api/issues/122
//       Or, utilize a different mock API option.

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Product } from './product';

@Injectable()
export class ProductService {

  baseUrl = './api/products/products.json';

  constructor(private http: Http) { }

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.productUrl)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      // .catch(this.handleError);
    return this.http.get(this.baseUrl)
      .map(this.extractData)
      .do(data => console.log('getProducts: ' + JSON.stringify(data)))
      .catch(this.handleError);
    // return this.http.get(this.baseUrl)
    //   .map((res: any) => res.json());
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
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // this.http.get('http://www.google.com', {headers} )

    console.log(product);
    return Observable.of(product);
  }

  deleteProduct(id: number | string): Observable<number> {
    console.log(id + ' deleted!');
    return Observable.of(+id);
  }

  private extractData(response: Response) {
    const body = response.json();
    return body || {};
    // return body.data || {};
  }

  private handleError(error: Response): Observable<any> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (error.type === ResponseType.Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.toString()}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${error.statusText}, error message is: ${error.toString()}`;
    }
    console.error(errorMessage);
    return Observable.throw(error.json().error || errorMessage);
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
