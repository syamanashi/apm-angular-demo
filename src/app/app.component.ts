import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

  constructor(public authService: AuthService) { }

  onLogout(): void {
    this.authService.logout();
  }

}
