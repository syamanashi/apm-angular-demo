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

  private baseUrl = 'api/products';

  constructor(private http: Http) { }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.baseUrl)
      .map(this.extractData)
      // .do(data => console.log('getProducts: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getProduct(id: number | string): Observable<Product> {
    if (id === 0) {
      // Return a newly initialized product.
      // Note: Often the backend API server is set up to return a newly initialized item.  In that case, this block of code would not be needed.
      return Observable.of(this.initializeProduct());
    }
    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url)
      .map(this.extractData)
      // .do(data => console.log('getProduct(' + id + '): ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveProduct(product: Product): Observable<Product> {
    // console.log(product);
    // return Observable.of(product);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    if (product.id === 0) {
      return this.createProduct(product, options);
    }
    return this.updateProduct(product, options);
  }

  deleteProduct(id: number | string): Observable<Response> {
    // In most real world solutions, we'd rather be updating product.deleted to true or product.status to 'deleted' rather than performing this hard delete.
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, options)
      .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private createProduct(product: Product, options: RequestOptions): Observable<Product> {
    product.id = undefined; // angular-in-memory-web-api requires an id of undefined before it will assign a unique id.
    return this.http.post(this.baseUrl, product, options)
      .map(this.extractData)
      // .do(data => console.log('createProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private updateProduct(product: Product, options: RequestOptions): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put(url, product, options)
      .map(() => product) // Since the angular-in-memory-web-api service does not return the updated product (which might be very useful if the server sets a LastUpdateDate for example) and really just returns a header with a status 204 ok...., map the response to this method's passed in product: Product.
      // .do(data => console.log('createProduct: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    // If needed, you can enhance returned data in this method (i.e. Alphabetize the search tags; Calculate the number of days since product was released/created, etc).
    const body = response.json();
    return body.data || {};
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

  private initializeProduct(): Product {
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
      tags: [''],
    };
  }

}
