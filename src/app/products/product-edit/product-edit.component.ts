import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap'; // Used to process the Observable route parameters.
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Product } from '../product';
import { ProductService } from '../product.service';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic.validator';

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Edit Product';
  errorMessage: string;
  productForm: FormGroup;
  product: Product;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidatator: GenericValidator;

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags');
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of teh validator for use with this form, passing in this form's set of validation messages.
    this.genericValidatator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.formBuilder.array([]),
      description: ''
    });

    //  Reading Resolver Data - Observable
    this.route.data.subscribe(data => {
      this.onProductRetrieved(data['product']); // We are only notified when the resolver Re-fetches data - not if our code changes that data.
    })

    // Read the product Id from the route parameter's params observable.
    // this.paramsSubscription = this.route.params.subscribe((params)  => {
    //   const id = +params['id'];
    //   this.getProduct(id);
    // });

    // Alternatively, use a .switchMap on the route.paramMap (v4+) observable as this operator can cancel in-flight network requests.
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.productService.getProduct(params.get('id')))
    //   .subscribe(
    //     (product: Product) => this.onProductRetrieved(product),
    //     (error: any) => this.errorMessage = <any>error
    //   );
  }

  ngAfterViewInit() {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable.
    Observable.merge(this.productForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      this.displayMessage = this.genericValidatator.processMessages(this.productForm);
    });
  }

  addTag() {
    this.tags.push(new FormControl());
  }

  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe(
  //     (product: Product) => this.onProductRetrieved(product), // Fires when getProduct() returns a Product.
  //     (error: any) => this.errorMessage = <any>error
  //   );
  // }

  private onProductRetrieved(product: Product): void {
    // Reset the form if the form is loaded.
    if (this.productForm) {
      this.productForm.reset();
    }
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }

    // Update the data on the form.
    this.productForm.patchValue({
      productName: this.product.productName,
      productCode: this.product.productCode,
      starRating: this.product.starRating,
      description: this.product.description,
    });
    this.productForm.setControl('tags', this.formBuilder.array(this.product.tags || []));
  }

  onDelete() {
    if (this.product.id === 0 ) {
      // Don't delete. It was never saved.
      this.resetFormGotoProducts();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe(
          () => this.resetFormGotoProducts(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  onSave(): void {
    if (this.productForm.dirty && this.productForm.valid) {
      // Copy the form values over the product object values.  This gives us all of the original product object values (including product.id) and then overrides them with any updated productForm values from the user.
      const product = Object.assign({}, this.product, this.productForm.value);

      this.productService.saveProduct(product).subscribe(
        () => this.onSaveComplete(), // In this case, we don't care about the returned data so we do not reference it in () =>
        (error: any) => this.errorMessage = <any>error
      );
    } else if (!this.productForm.dirty) {
      this.resetFormGotoProducts();
    }
  }

  private onSaveComplete(): void {
    this.resetFormGotoProducts();
  }

  onCancel(): void {
    this.resetFormGotoProducts();
  }

  resetFormGotoProducts(): void {
    // Reset the form to clear the flags and dirty status.
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

}
