import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome'); // Use navigateByUrl to ensure that every URL parameter or secondary route is removed when the user logs out.
  }

}
