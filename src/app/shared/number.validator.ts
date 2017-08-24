import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  /** Custom validator with parameters using ValidatorFn */
  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
        return { 'range': true }; // Returns the name of the failed validation rule with the value of true.
      }
      return null;
    }
  }

}
