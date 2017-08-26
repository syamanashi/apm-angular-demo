import { Injectable } from '@angular/core';

import { User } from './user';
import { MessageService } from '../messages/message.service';

@Injectable()
export class AuthService {

  currentUser: User;
  redirectUrl: string;

  constructor(private messageService: MessageService) { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(username: string, password: string): void {
    if (!username || !password) {
      this.messageService.addMessage('Please enter your username and password.');
      return;
    }

    if (username === 'admin' && password === 'admin') {
      this.currentUser = {
        id: 1,
        username: username,
        isAdmin: true
      };
      this.messageService.addMessage('Admin login successful!');
      return
    }
    this.currentUser = {
      id: 2,
      username: username,
      isAdmin: false
    };
    this.messageService.addMessage(`User: ${this.currentUser.username} logged in!`);
  }

  logout(): void {
    this.currentUser = null;
  }

}
