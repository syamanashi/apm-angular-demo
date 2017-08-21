import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const id = +next.url[1].path;
    if (isNaN(id) || id < 1) {
      alert('Invalid product Id: ' + id); // Do not display this alert. Rather, route to an error page with an error message.
      this.router.navigate(['/products']);
      return false;
    }
    return true;

  }
}
