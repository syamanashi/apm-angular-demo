import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
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
export class ProductEditComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Edit Product';
  errorMessage: string;
  productForm: FormGroup;
  product: Product;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidatator: GenericValidator;

  private paramsSubscription: Subscription;

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

    // Read the product Id from the route parameter
    this.paramsSubscription = this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getProduct(id);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
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

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe(
      (product: Product) => this.onProductRetrieved(product), // Fires when getProduct() returns a Product.
      (error: any) => this.errorMessage = <any>error
    );
  }

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
      this.resetThenGotoProducts();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe(
          () => this.resetThenGotoProducts(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  onSave() {
    if (this.productForm.dirty && this.productForm.valid) {
      // Copy the form values over the product object values.
      const p = Object.assign({}, this.product, this.productForm.value);

      this.productService.saveProduct(p).subscribe(
        () => this.onSaveComplete(),
        (error: any) => this.errorMessage = <any>error
      );
    } else if (!this.productForm.dirty) {
      this.resetThenGotoProducts();
    }
  }

  onSaveComplete(): void {
    this.resetThenGotoProducts();
  }

  onCancel(): void {
    this.resetThenGotoProducts();
  }

  resetThenGotoProducts(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['/products']);
  }

}
