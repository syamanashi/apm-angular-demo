import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  pageTitle = 'Log In';
  username: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      this.username = loginForm.form.value.username;
      this.password = loginForm.form.value.password;
      this.authService.login(this.username, this.password);

      if (this.authService.redirectUrl) {
        this.router.navigateByUrl(this.authService.redirectUrl);
      } else {
        this.router.navigate(['/products']);
      }
    } else {
      this.errorMessage = 'Please enter a username and password.';
    }
  }

}
